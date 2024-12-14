import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid"; // UUID สำหรับสร้าง unique id

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const Activation = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [rankInfo, setRankInfo] = useState(null); // { ranksname, farmbots, activated }
  const [formData, setFormData] = useState({ ea_token: "", port_number: "", symbol: "" });
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState(null); // Row being edited
  const [errorMessage, setErrorMessage] = useState("");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showResetPasswordPopup, setShowResetPasswordPopup] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    phone_number: "",
    facebook: "",
    line: "",
    tiktok: "",
    wechat: "",
    whatsapp: "",
    address: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleLogin = async () => {
    try {
      const { data, error } = await supabase
        .from("Pin_UUID")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error || !data) {
        setErrorMessage("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      setIsAuthenticated(true);
      setRankInfo({
        ranksname: data.ranksname,
        farmbots: data.farmbots,
        activated: 0, // ดึงค่าเริ่มต้น activated จากจำนวนแถวใน EA_Lock
      });
      setProfileData({
        name: data.name,
        surname: data.surname,
        phone_number: data.phone_number,
        facebook: data.facebook,
        line: data.line,
        tiktok: data.tiktok,
        wechat: data.wechat,
        whatsapp: data.whatsapp,
        address: data.address,
      });
      fetchRows(email);
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };

  const fetchRows = async (userEmail) => {
    try {
      // ดึงข้อมูล EA_Lock
      const { data: eaData, error: eaError } = await supabase
        .from("EA_Lock")
        .select("*")
        .eq("email", userEmail);
  
      if (eaError) {
        console.error("Error fetching rows:", eaError);
        throw eaError;
      }
  
      setRows(eaData);
  
      // ดึงข้อมูล Pin_UUID สำหรับ expired_date
      const { data: pinData, error: pinError } = await supabase
        .from("Pin_UUID")
        .select("expired_date")
        .eq("email", userEmail)
        .single();
  
      if (pinError) {
        console.error("Error fetching expired_date:", pinError);
        throw pinError;
      }
  
      // Update rankInfo
      if (rankInfo) {
        setRankInfo((prev) => ({
          ...prev,
          activated: eaData.length,
          expired_date: pinData?.expired_date, // เพิ่ม expired_date
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
    }
  };
  


  const handleAddRow = async () => {
    try {
      // ตรวจสอบสิทธิ์ที่เหลือ
      if (rankInfo.activated >= rankInfo.farmbots) {
        alert("คุณใช้สิทธิ์ครบแล้ว");
        return;
      }

      // เพิ่มแถวใหม่ในตาราง EA_Lock
      const newRow = {
        ...formData,
        email,
        uuid_install: uuidv4(),
        date_update: new Date().toISOString(),
      };
      const { error } = await supabase.from("EA_Lock").insert([newRow]);

      if (error) {
        console.error("Error adding row:", error);
        alert("ไม่สามารถเพิ่มแถวได้ กรุณาลองใหม่");
        return;
      }

      // อัปเดตข้อมูลในตาราง
      fetchRows(email);

      // อัปเดต activated ใน rankInfo
      setRankInfo((prev) => ({
        ...prev,
        activated: prev.activated + 1,
      }));

      // รีเซ็ตฟอร์ม
      setFormData({ ea_token: "", port_number: "", symbol: "" });

      alert("เพิ่มข้อมูลสำเร็จ!");
    } catch (error) {
      console.error("Error in handleAddRow:", error);
      alert("เกิดข้อผิดพลาด กรุณาลองใหม่");
    }
  };
  const handleEditClick = (row) => {
    setEditRow(row); // Set the row to be edited
  };
  
  const handleEditSave = async () => {
    if (!editRow) return;
  
    try {
      const updatedRow = {
        ea_token: editRow.ea_token,
        port_number: editRow.port_number,
        symbol: editRow.symbol,
        date_update: new Date().toISOString(),
      };
  
      const { error } = await supabase
        .from("EA_Lock")
        .update(updatedRow)
        .eq("uuid_install", editRow.uuid_install);
  
      if (error) {
        alert("Failed to update row. Please try again.");
        console.error("Error updating row:", error);
        return;
      }
  
      // Refresh rows and clear edit state
      fetchRows(email);
      setEditRow(null);
      alert("Row updated successfully!");
    } catch (error) {
      console.error("Error in handleEditSave:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  const handleDeleteRow = async (uuid_install) => {
    try {
      const { error } = await supabase
        .from("EA_Lock")
        .delete()
        .eq("uuid_install", uuid_install);

      if (error) {
        console.error("Error deleting row:", error);
        alert("ไม่สามารถลบข้อมูลได้ กรุณาลองใหม่");
        return;
      }

      fetchRows(email);
      setRankInfo((prev) => ({
        ...prev,
        activated: prev.activated - 1,
      }));
      alert("ลบข้อมูลสำเร็จ!");
    } catch (error) {
      console.error("Error in handleDeleteRow:", error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const { error } = await supabase
        .from("Pin_UUID")
        .update(profileData)
        .eq("email", email);

      if (error) {
        console.error("Error updating profile:", error);
        alert("ไม่สามารถบันทึกข้อมูลได้ กรุณาลองใหม่");
        return;
      }

      alert("Profile updated successfully");
      setShowProfilePopup(false);
    } catch (error) {
      console.error("Error in handleSaveProfile:", error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    if (newPassword.length < 8 || !/^[a-zA-Z0-9]+$/.test(newPassword)) {
      alert("Password must be at least 8 characters and contain only English letters and numbers");
      return;
    }

    try {
      const { data, error } = await supabase
        .from("Pin_UUID")
        .select("password")
        .eq("email", email)
        .single();

      if (error || data.password !== oldPassword) {
        alert("Old password is incorrect");
        return;
      }

      const { error: updateError } = await supabase
        .from("Pin_UUID")
        .update({ password: newPassword })
        .eq("email", email);

      if (updateError) {
        console.error("Error updating password:", updateError);
        alert("Failed to reset password. Please try again.");
        return;
      }

      alert("Password reset successfully");
      setShowResetPasswordPopup(false);
    } catch (error) {
      console.error("Error in handleResetPassword:", error);
    }
  };

  if (!isAuthenticated) {
    return (
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  }}
>
  <div
    style={{
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      width: "100%",
      maxWidth: "400px",
      textAlign: "center",
      fontFamily: "'Roboto', sans-serif",
    }}
  >
    <h1 style={{ fontSize: "24px", color: "#002D72", marginBottom: "20px" }}>
      Bot Mogul Activation
    </h1>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px",
      }}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      style={{
        width: "100%",
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        fontSize: "16px",
      }}
    />
    <button
      onClick={handleLogin}
      style={{
        width: "100%",
        padding: "10px",
        backgroundColor: "#002D72",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      Login
    </button>
    {errorMessage && (
      <p style={{ color: "red", marginTop: "15px", fontSize: "14px" }}>
        {errorMessage}
      </p>
    )}
  </div>
</div>

    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
<div style={{ maxWidth: "1200px", margin: "auto", fontFamily: "Arial, sans-serif" }}>
  <header
    style={{
      backgroundColor: "#002D72",
      color: "white",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}
  >
    <h1 style={{ marginBottom: "5px" }}>Bot Activation</h1>
    <p style={{ margin: "5px 0" }}>{rankInfo.ranksname}</p>
    <p style={{ margin: "5px 0", fontSize: "15px", color: "#bbff80"  }}>
      Activated {rankInfo.activated} | {rankInfo.farmbots}
    </p>
    <p style={{ margin: "5px 0", fontSize: "15px", color: "#FFD700" }}>
    {rankInfo.expired_date
      ? `Expired Date: ${new Date(rankInfo.expired_date).toLocaleDateString()}`
      : "No Expiry Set"}
  </p>
    <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "10px" }}>
      <button
        onClick={() => setShowProfilePopup(true)}
        style={{
          backgroundColor: "#FFD700",
          color: "white",
          border: "0px solid #FFD700",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
        }}
      >
        Profile
      </button>
      <button
        onClick={() => setShowResetPasswordPopup(true)}
        style={{
          backgroundColor: "#FFD700",
          color: "white",
          border: "0px solid #FFD700",
          borderRadius: "5px",
          padding: "5px 10px",
          cursor: "pointer",
          fontSize: "11px",
        }}
      >
        Reset Password
      </button>
    </div>
  </header>
  <div
    style={{
      padding: "20px",
      borderRadius: "8px",
      backgroundColor: "#f5f5f5",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
    }}
  >
    <h3>Add New Bot Activation Row</h3>
    <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
      <input
        type="text"
        placeholder="EA Token"
        value={formData.ea_token}
        onChange={(e) => setFormData({ ...formData, ea_token: e.target.value })}
        style={{
          padding: "10px",
          width: "500px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <input
        type="number"
        placeholder="Port Number"
        value={formData.port_number}
        onChange={(e) => setFormData({ ...formData, port_number: e.target.value })}
        style={{
          padding: "10px",
          width: "500px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <input
        type="text"
        placeholder="Symbol"
        value={formData.symbol}
        onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
        style={{
          padding: "10px",
          width: "500px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />
      <button
        onClick={handleAddRow}
        style={{
          padding: "10px 10px",
          width: "400px",
          fontSize: "16px",
          backgroundColor: "#002D72",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Row
      </button>
    </div>
  </div>

  <div style={{ marginTop: "20px" }}>
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        marginBottom: "20px",
        boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <thead style={{ backgroundColor: "#002D72", color: "white" }}>
        <tr>
          <th style={{ padding: "10px", borderRight: "1px solid white" }}>#</th>
          <th style={{ padding: "10px", borderRight: "1px solid white" }}>EA Token</th>
          <th style={{ padding: "10px", borderRight: "1px solid white" }}>Port Number</th>
          <th style={{ padding: "10px", borderRight: "1px solid white" }}>Symbol</th>
          <th style={{ padding: "10px", borderRight: "1px solid white" }}>Last Updated</th>
          <th style={{ padding: "10px" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
  {rows.map((row, index) => (
    <tr key={row.uuid_install} style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}>
      <td style={{ padding: "10px", textAlign: "center", borderRight: "1px solid #ccc" }}>
        {index + 1}
      </td>
      <td style={{ padding: "10px", borderRight: "1px solid #ccc" }}>
        {editRow?.uuid_install === row.uuid_install ? (
          <input
            type="text"
            value={editRow.ea_token}
            onChange={(e) => setEditRow({ ...editRow, ea_token: e.target.value })}
            style={{
              width: "100%",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ) : (
          row.ea_token
        )}
      </td>
      <td style={{ padding: "10px", textAlign: "center", borderRight: "1px solid #ccc" }}>
        {editRow?.uuid_install === row.uuid_install ? (
          <input
            type="number"
            value={editRow.port_number}
            onChange={(e) => setEditRow({ ...editRow, port_number: e.target.value })}
            style={{
              width: "100%",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ) : (
          row.port_number
        )}
      </td>
      <td style={{ padding: "10px", textAlign: "center", borderRight: "1px solid #ccc" }}>
        {editRow?.uuid_install === row.uuid_install ? (
          <input
            type="text"
            value={editRow.symbol}
            onChange={(e) => setEditRow({ ...editRow, symbol: e.target.value })}
            style={{
              width: "100%",
              padding: "5px",
              border: "1px solid #ccc",
              borderRadius: "5px",
            }}
          />
        ) : (
          row.symbol
        )}
      </td>
      <td style={{ padding: "10px", textAlign: "center", borderRight: "1px solid #ccc" }}>
        {row.date_update ? new Date(row.date_update).toLocaleString() : "N/A"}
      </td>
      <td style={{ padding: "10px", textAlign: "center" }}>
        {editRow?.uuid_install === row.uuid_install ? (
          <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
            <button
              onClick={handleEditSave}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setEditRow(null)}
              style={{
                backgroundColor: "#DC143C",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
            <button
              onClick={() => handleEditClick(row)}
              style={{
                backgroundColor: "#FFD700",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteRow(row.uuid_install)}
              style={{
                backgroundColor: "#DC143C",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        )}
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>


</div>



      


      {showProfilePopup && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "5px", width: "400px", position: "relative" }}>
          <button
              style={{
                position: "absolute",
                bott: "10px",
                right: "10px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                textAlign: "center",
              }}
              onClick={() => setShowProfilePopup(false)}
            >
              ✖
            </button>
            <h2>Profile</h2>
            <form>
              {[
                { label: "Name", value: profileData.name, field: "name" },
                { label: "Surname", value: profileData.surname, field: "surname" },
                { label: "Phone Number", value: profileData.phone_number, field: "phone_number" },
                { label: "Facebook", value: profileData.facebook, field: "facebook" },
                { label: "Line", value: profileData.line, field: "line" },
                { label: "TikTok", value: profileData.tiktok, field: "tiktok" },
                { label: "WeChat", value: profileData.wechat, field: "wechat" },
                { label: "WhatsApp", value: profileData.whatsapp, field: "whatsapp" },
              ].map((field, index) => (
                <div key={index} style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
                  <label style={{ flex: 1, textAlign: "right", marginRight: "10px" }}>{field.label}:</label>
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => setProfileData({ ...profileData, [field.field]: e.target.value })}
                    style={{ flex: 2, padding: "10px" }}
                  />
                </div>
              ))}
              <div style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
                <label style={{ flex: 1, textAlign: "right", marginRight: "10px" }}>Address:</label>
                <textarea
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  style={{ flex: 2, padding: "10px" }}
                ></textarea>
              </div>
              <button
                type="button"
                onClick={handleSaveProfile}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#003366",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}


      {showResetPasswordPopup && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "5px", width: "400px", position: "relative" }}>
            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                backgroundColor: "black",
                color: "white",
                border: "none",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                textAlign: "center",
              }}
              onClick={() => setShowResetPasswordPopup(false)}
            >
              ✖
            </button>
            <h2>Reset Password</h2>
            <form>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ flex: 1, textAlign: "right", marginRight: "10px" }}>Old Password:</label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{
                      flex: 2,
                      fontSize: "9px",
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      width: "250px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ flex: 1, textAlign: "right", marginRight: "10px" }}>New Password:</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                      flex: 2,
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      width: "250px",
                    }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <label style={{ flex: 1, textAlign: "right", marginRight: "10px" }}>Confirm New Password:</label>
                  <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    style={{
                      flex: 2,
                      padding: "8px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      width: "250px",
                    }}
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleResetPassword}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#003366",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "16px",
                }}
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Activation;


