"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/fetchData";
exports.ids = ["pages/api/fetchData"];
exports.modules = {

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "express-rate-limit":
/*!*************************************!*\
  !*** external "express-rate-limit" ***!
  \*************************************/
/***/ ((module) => {

module.exports = import("express-rate-limit");;

/***/ }),

/***/ "(api)/./pages/api/fetchData.js":
/*!********************************!*\
  !*** ./pages/api/fetchData.js ***!
  \********************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var express_rate_limit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express-rate-limit */ \"express-rate-limit\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([express_rate_limit__WEBPACK_IMPORTED_MODULE_1__]);\nexpress_rate_limit__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n// pages/api/fetchData.js\n\n\n// Define Supabase URL and Key\nconst supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;\nconst supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(supabaseUrl, supabaseAnonKey);\n// Configure rate limiter\nconst limiter = (0,express_rate_limit__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n    windowMs: 15 * 60 * 1000,\n    max: 100\n});\n// Define the handler function\nasync function handler(req, res) {\n    // Apply rate limiting\n    await limiter(req, res, async ()=>{\n        const validToken = \"yourSecretToken\"; // Hardcoded token\n        const token = req.query.token; // Get token from query parameters\n        if (token !== validToken) {\n            return res.status(401).json({\n                error: \"Unauthorized\"\n            });\n        }\n        const { uuid  } = req.query; // Expecting uuid as a query parameter\n        if (uuid) {\n            // Fetch data from EA_Lock if UUID is provided\n            try {\n                const { data: eaLocks , error  } = await supabase.from(\"EA_Lock\").select(\"save_uuid, email, countport\").eq(\"save_uuid\", uuid); // Filter by the user UUID\n                if (error) throw error;\n                return res.status(200).json(eaLocks); // Send data back to the client\n            } catch (error1) {\n                console.error(\"Error fetching EA_Lock data:\", error1);\n                return res.status(500).json({\n                    error: error1.message\n                });\n            }\n        }\n        // Fallback to other data fetching logic if UUID is not provided\n        const { ea_token , name , description , realm , dev_name , modified_date , created_at  } = req.query;\n        let query = supabase.from(\"list\").select(\"*\").order(\"id\", {\n            ascending: false\n        });\n        // Apply search filters based on query parameters\n        if (ea_token) query = query.ilike(\"ea_token\", `%${ea_token}%`);\n        if (name) query = query.ilike(\"name\", `%${name}%`);\n        if (description) query = query.ilike(\"description\", `%${description}%`);\n        if (realm) query = query.ilike(\"realm\", `%${realm}%`);\n        if (dev_name) query = query.ilike(\"dev_name\", `%${dev_name}%`);\n        if (modified_date) query = query.ilike(\"modified_date\", `%${modified_date}%`);\n        if (created_at) query = query.ilike(\"created_at\", `%${created_at}%`);\n        let allData = [];\n        let page = 1;\n        const pageSize = 1000;\n        while(true){\n            const { data , error: error2  } = await query.range((page - 1) * pageSize, page * pageSize - 1);\n            if (error2) throw error2;\n            if (!data.length) break;\n            allData = [\n                ...allData,\n                ...data\n            ];\n            page++;\n        }\n        return res.status(200).json(allData);\n    });\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NUUsSUFBSUMsWUFBWWxCLFFBQVFBLE1BQU1xQixLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRUgsV0FBVyxDQUFDLENBQUM7UUFFbkUsSUFBSUksVUFBVSxFQUFFO1FBQ2hCLElBQUlDLE9BQU87UUFDWCxNQUFNQyxXQUFXO1FBRWpCLE1BQU8sSUFBSSxDQUFFO1lBQ1gsTUFBTSxFQUFFbkIsS0FBSSxFQUFFRixPQUFBQSxPQUFLLEVBQUUsR0FBRyxNQUFNSCxNQUFNeUIsS0FBSyxDQUFDLENBQUNGLE9BQU8sS0FBS0MsVUFBVUQsT0FBT0MsV0FBVztZQUNuRixJQUFJckIsUUFBTyxNQUFNQSxPQUFNO1lBQ3ZCLElBQUksQ0FBQ0UsS0FBS3FCLE1BQU0sRUFBRSxLQUFNO1lBQ3hCSixVQUFVO21CQUFJQTttQkFBWWpCO2FBQUs7WUFDL0JrQjtRQUNGO1FBRUEsT0FBTzFCLElBQUlJLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNvQjtJQUM5QjtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93b3JsZGJvdGFwaS8uL3BhZ2VzL2FwaS9mZXRjaERhdGEuanM/OGNmMCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwYWdlcy9hcGkvZmV0Y2hEYXRhLmpzXG5pbXBvcnQgeyBjcmVhdGVDbGllbnQgfSBmcm9tICdAc3VwYWJhc2Uvc3VwYWJhc2UtanMnO1xuaW1wb3J0IHJhdGVMaW1pdCBmcm9tICdleHByZXNzLXJhdGUtbGltaXQnO1xuXG4vLyBEZWZpbmUgU3VwYWJhc2UgVVJMIGFuZCBLZXlcbmNvbnN0IHN1cGFiYXNlVXJsID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIHx8IHByb2Nlc3MuZW52LlNVUEFCQVNFX1VSTDtcbmNvbnN0IHN1cGFiYXNlQW5vbktleSA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIHx8IHByb2Nlc3MuZW52LlNVUEFCQVNFX0FOT05fS0VZO1xuXG5jb25zdCBzdXBhYmFzZSA9IGNyZWF0ZUNsaWVudChzdXBhYmFzZVVybCwgc3VwYWJhc2VBbm9uS2V5KTtcblxuLy8gQ29uZmlndXJlIHJhdGUgbGltaXRlclxuY29uc3QgbGltaXRlciA9IHJhdGVMaW1pdCh7XG4gIHdpbmRvd01zOiAxNSAqIDYwICogMTAwMCwgLy8gMTUgbWludXRlc1xuICBtYXg6IDEwMCwgLy8gTGltaXQgZWFjaCBJUCB0byAxMDAgcmVxdWVzdHMgcGVyIHdpbmRvd01zXG59KTtcblxuLy8gRGVmaW5lIHRoZSBoYW5kbGVyIGZ1bmN0aW9uXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIC8vIEFwcGx5IHJhdGUgbGltaXRpbmdcbiAgYXdhaXQgbGltaXRlcihyZXEsIHJlcywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHZhbGlkVG9rZW4gPSAneW91clNlY3JldFRva2VuJzsgLy8gSGFyZGNvZGVkIHRva2VuXG5cbiAgICBjb25zdCB0b2tlbiA9IHJlcS5xdWVyeS50b2tlbjsgLy8gR2V0IHRva2VuIGZyb20gcXVlcnkgcGFyYW1ldGVyc1xuICAgIGlmICh0b2tlbiAhPT0gdmFsaWRUb2tlbikge1xuICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgZXJyb3I6ICdVbmF1dGhvcml6ZWQnIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHsgdXVpZCB9ID0gcmVxLnF1ZXJ5OyAvLyBFeHBlY3RpbmcgdXVpZCBhcyBhIHF1ZXJ5IHBhcmFtZXRlclxuXG4gICAgaWYgKHV1aWQpIHtcbiAgICAgIC8vIEZldGNoIGRhdGEgZnJvbSBFQV9Mb2NrIGlmIFVVSUQgaXMgcHJvdmlkZWRcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogZWFMb2NrcywgZXJyb3IgfSA9IGF3YWl0IHN1cGFiYXNlXG4gICAgICAgICAgLmZyb20oJ0VBX0xvY2snKVxuICAgICAgICAgIC5zZWxlY3QoJ3NhdmVfdXVpZCwgZW1haWwsIGNvdW50cG9ydCcpXG4gICAgICAgICAgLmVxKCdzYXZlX3V1aWQnLCB1dWlkKTsgLy8gRmlsdGVyIGJ5IHRoZSB1c2VyIFVVSURcblxuICAgICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuXG4gICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihlYUxvY2tzKTsgLy8gU2VuZCBkYXRhIGJhY2sgdG8gdGhlIGNsaWVudFxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZmV0Y2hpbmcgRUFfTG9jayBkYXRhOicsIGVycm9yKTtcbiAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5qc29uKHsgZXJyb3I6IGVycm9yLm1lc3NhZ2UgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmFsbGJhY2sgdG8gb3RoZXIgZGF0YSBmZXRjaGluZyBsb2dpYyBpZiBVVUlEIGlzIG5vdCBwcm92aWRlZFxuICAgIGNvbnN0IHsgZWFfdG9rZW4sIG5hbWUsIGRlc2NyaXB0aW9uLCByZWFsbSwgZGV2X25hbWUsIG1vZGlmaWVkX2RhdGUsIGNyZWF0ZWRfYXQgfSA9IHJlcS5xdWVyeTtcbiAgICBsZXQgcXVlcnkgPSBzdXBhYmFzZS5mcm9tKCdsaXN0Jykuc2VsZWN0KCcqJykub3JkZXIoJ2lkJywgeyBhc2NlbmRpbmc6IGZhbHNlIH0pO1xuXG4gICAgLy8gQXBwbHkgc2VhcmNoIGZpbHRlcnMgYmFzZWQgb24gcXVlcnkgcGFyYW1ldGVyc1xuICAgIGlmIChlYV90b2tlbikgcXVlcnkgPSBxdWVyeS5pbGlrZSgnZWFfdG9rZW4nLCBgJSR7ZWFfdG9rZW59JWApO1xuICAgIGlmIChuYW1lKSBxdWVyeSA9IHF1ZXJ5LmlsaWtlKCduYW1lJywgYCUke25hbWV9JWApO1xuICAgIGlmIChkZXNjcmlwdGlvbikgcXVlcnkgPSBxdWVyeS5pbGlrZSgnZGVzY3JpcHRpb24nLCBgJSR7ZGVzY3JpcHRpb259JWApO1xuICAgIGlmIChyZWFsbSkgcXVlcnkgPSBxdWVyeS5pbGlrZSgncmVhbG0nLCBgJSR7cmVhbG19JWApO1xuICAgIGlmIChkZXZfbmFtZSkgcXVlcnkgPSBxdWVyeS5pbGlrZSgnZGV2X25hbWUnLCBgJSR7ZGV2X25hbWV9JWApO1xuICAgIGlmIChtb2RpZmllZF9kYXRlKSBxdWVyeSA9IHF1ZXJ5LmlsaWtlKCdtb2RpZmllZF9kYXRlJywgYCUke21vZGlmaWVkX2RhdGV9JWApO1xuICAgIGlmIChjcmVhdGVkX2F0KSBxdWVyeSA9IHF1ZXJ5LmlsaWtlKCdjcmVhdGVkX2F0JywgYCUke2NyZWF0ZWRfYXR9JWApO1xuXG4gICAgbGV0IGFsbERhdGEgPSBbXTtcbiAgICBsZXQgcGFnZSA9IDE7XG4gICAgY29uc3QgcGFnZVNpemUgPSAxMDAwO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHF1ZXJ5LnJhbmdlKChwYWdlIC0gMSkgKiBwYWdlU2l6ZSwgcGFnZSAqIHBhZ2VTaXplIC0gMSk7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgaWYgKCFkYXRhLmxlbmd0aCkgYnJlYWs7XG4gICAgICBhbGxEYXRhID0gWy4uLmFsbERhdGEsIC4uLmRhdGFdO1xuICAgICAgcGFnZSsrO1xuICAgIH1cblxuICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuanNvbihhbGxEYXRhKTtcbiAgfSk7XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50IiwicmF0ZUxpbWl0Iiwic3VwYWJhc2VVcmwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwiU1VQQUJBU0VfVVJMIiwic3VwYWJhc2VBbm9uS2V5IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJTVVBBQkFTRV9BTk9OX0tFWSIsInN1cGFiYXNlIiwibGltaXRlciIsIndpbmRvd01zIiwibWF4IiwiaGFuZGxlciIsInJlcSIsInJlcyIsInZhbGlkVG9rZW4iLCJ0b2tlbiIsInF1ZXJ5Iiwic3RhdHVzIiwianNvbiIsImVycm9yIiwidXVpZCIsImRhdGEiLCJlYUxvY2tzIiwiZnJvbSIsInNlbGVjdCIsImVxIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJlYV90b2tlbiIsIm5hbWUiLCJkZXNjcmlwdGlvbiIsInJlYWxtIiwiZGV2X25hbWUiLCJtb2RpZmllZF9kYXRlIiwiY3JlYXRlZF9hdCIsIm9yZGVyIiwiYXNjZW5kaW5nIiwiaWxpa2UiLCJhbGxEYXRhIiwicGFnZSIsInBhZ2VTaXplIiwicmFuZ2UiLCJsZW5ndGgiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/fetchData.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/fetchData.js"));
module.exports = __webpack_exports__;

})();