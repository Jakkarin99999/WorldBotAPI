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
exports.id = "pages/api/expert_advisors";
exports.ids = ["pages/api/expert_advisors"];
exports.modules = {

/***/ "@supabase/supabase-js":
/*!****************************************!*\
  !*** external "@supabase/supabase-js" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("@supabase/supabase-js");

/***/ }),

/***/ "(api)/./pages/api/expert_advisors.js":
/*!**************************************!*\
  !*** ./pages/api/expert_advisors.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @supabase/supabase-js */ \"@supabase/supabase-js\");\n/* harmony import */ var _supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__);\n// pages/api/expert_advisors.js\n\nconst supabase = (0,_supabase_supabase_js__WEBPACK_IMPORTED_MODULE_0__.createClient)(\"https://zdxrypcglsoaizoqinoz.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpkeHJ5cGNnbHNvYWl6b3Fpbm96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkwNTQxMTIsImV4cCI6MjAyNDYzMDExMn0._-31vXsYDI_H6cpxh4PzVKSz3-YaUNpP0-kHSTa16wk\");\nasync function handler(req, res) {\n    const { ea_token , name , description , realm , dev_name , modified_date , created_at  } = req.query;\n    try {\n        let query = supabase.from(\"Expert_Advisor\").select(\"*\");\n        // Apply search filters based on query parameters\n        if (ea_token) query = query.ilike(\"ea_token\", `%${ea_token}%`);\n        if (name) query = query.ilike(\"name\", `%${name}%`);\n        if (description) query = query.ilike(\"description\", `%${description}%`);\n        if (realm) query = query.ilike(\"realm\", `%${realm}%`);\n        if (dev_name) query = query.ilike(\"dev_name\", `%${dev_name}%`);\n        if (modified_date) query = query.ilike(\"modified_date\", `%${modified_date}%`);\n        if (created_at) query = query.ilike(\"created_at\", `%${created_at}%`);\n        const { data , error  } = await query;\n        if (error) {\n            return res.status(500).json({\n                error: error.message\n            });\n        }\n        res.status(200).json(data);\n    } catch (error1) {\n        res.status(500).json({\n            error: \"Failed to fetch data\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvZXhwZXJ0X2Fkdmlzb3JzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtCQUErQjtBQUVzQjtBQUVyRCxNQUFNQyxXQUFXRCxtRUFBWUEsQ0FBQ0UsMENBQW9DLEVBQUVBLGtOQUF5QztBQUU5RixlQUFlSSxRQUFRQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUM5QyxNQUFNLEVBQUVDLFNBQVEsRUFBRUMsS0FBSSxFQUFFQyxZQUFXLEVBQUVDLE1BQUssRUFBRUMsU0FBUSxFQUFFQyxjQUFhLEVBQUVDLFdBQVUsRUFBRSxHQUFHUixJQUFJUyxLQUFLO0lBRTdGLElBQUk7UUFDRixJQUFJQSxRQUFRZixTQUFTZ0IsSUFBSSxDQUFDLGtCQUFrQkMsTUFBTSxDQUFDO1FBRW5ELGlEQUFpRDtRQUNqRCxJQUFJVCxVQUFVTyxRQUFRQSxNQUFNRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRVYsU0FBUyxDQUFDLENBQUM7UUFDN0QsSUFBSUMsTUFBTU0sUUFBUUEsTUFBTUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUVULEtBQUssQ0FBQyxDQUFDO1FBQ2pELElBQUlDLGFBQWFLLFFBQVFBLE1BQU1HLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFFUixZQUFZLENBQUMsQ0FBQztRQUN0RSxJQUFJQyxPQUFPSSxRQUFRQSxNQUFNRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRVAsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSUMsVUFBVUcsUUFBUUEsTUFBTUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUVOLFNBQVMsQ0FBQyxDQUFDO1FBQzdELElBQUlDLGVBQWVFLFFBQVFBLE1BQU1HLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUVMLGNBQWMsQ0FBQyxDQUFDO1FBQzVFLElBQUlDLFlBQVlDLFFBQVFBLE1BQU1HLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxFQUFFSixXQUFXLENBQUMsQ0FBQztRQUVuRSxNQUFNLEVBQUVLLEtBQUksRUFBRUMsTUFBSyxFQUFFLEdBQUcsTUFBTUw7UUFFOUIsSUFBSUssT0FBTztZQUNULE9BQU9iLElBQUljLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVGLE9BQU9BLE1BQU1HLE9BQU87WUFBQztRQUNyRCxDQUFDO1FBRURoQixJQUFJYyxNQUFNLENBQUMsS0FBS0MsSUFBSSxDQUFDSDtJQUN2QixFQUFFLE9BQU9DLFFBQU87UUFDZGIsSUFBSWMsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFRixPQUFPO1FBQXVCO0lBQ3ZEO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dvcmxkYm90YXBpLy4vcGFnZXMvYXBpL2V4cGVydF9hZHZpc29ycy5qcz82MTRkIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHBhZ2VzL2FwaS9leHBlcnRfYWR2aXNvcnMuanNcblxuaW1wb3J0IHsgY3JlYXRlQ2xpZW50IH0gZnJvbSAnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJztcblxuY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVDbGllbnQocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMLCBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcbiAgY29uc3QgeyBlYV90b2tlbiwgbmFtZSwgZGVzY3JpcHRpb24sIHJlYWxtLCBkZXZfbmFtZSwgbW9kaWZpZWRfZGF0ZSwgY3JlYXRlZF9hdCB9ID0gcmVxLnF1ZXJ5O1xuXG4gIHRyeSB7XG4gICAgbGV0IHF1ZXJ5ID0gc3VwYWJhc2UuZnJvbSgnRXhwZXJ0X0Fkdmlzb3InKS5zZWxlY3QoJyonKTtcblxuICAgIC8vIEFwcGx5IHNlYXJjaCBmaWx0ZXJzIGJhc2VkIG9uIHF1ZXJ5IHBhcmFtZXRlcnNcbiAgICBpZiAoZWFfdG9rZW4pIHF1ZXJ5ID0gcXVlcnkuaWxpa2UoJ2VhX3Rva2VuJywgYCUke2VhX3Rva2VufSVgKTtcbiAgICBpZiAobmFtZSkgcXVlcnkgPSBxdWVyeS5pbGlrZSgnbmFtZScsIGAlJHtuYW1lfSVgKTtcbiAgICBpZiAoZGVzY3JpcHRpb24pIHF1ZXJ5ID0gcXVlcnkuaWxpa2UoJ2Rlc2NyaXB0aW9uJywgYCUke2Rlc2NyaXB0aW9ufSVgKTtcbiAgICBpZiAocmVhbG0pIHF1ZXJ5ID0gcXVlcnkuaWxpa2UoJ3JlYWxtJywgYCUke3JlYWxtfSVgKTtcbiAgICBpZiAoZGV2X25hbWUpIHF1ZXJ5ID0gcXVlcnkuaWxpa2UoJ2Rldl9uYW1lJywgYCUke2Rldl9uYW1lfSVgKTtcbiAgICBpZiAobW9kaWZpZWRfZGF0ZSkgcXVlcnkgPSBxdWVyeS5pbGlrZSgnbW9kaWZpZWRfZGF0ZScsIGAlJHttb2RpZmllZF9kYXRlfSVgKTtcbiAgICBpZiAoY3JlYXRlZF9hdCkgcXVlcnkgPSBxdWVyeS5pbGlrZSgnY3JlYXRlZF9hdCcsIGAlJHtjcmVhdGVkX2F0fSVgKTtcblxuICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHF1ZXJ5O1xuXG4gICAgaWYgKGVycm9yKSB7XG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmpzb24oeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9KTtcbiAgICB9XG5cbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihkYXRhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIGRhdGEnIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiY3JlYXRlQ2xpZW50Iiwic3VwYWJhc2UiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwiZWFfdG9rZW4iLCJuYW1lIiwiZGVzY3JpcHRpb24iLCJyZWFsbSIsImRldl9uYW1lIiwibW9kaWZpZWRfZGF0ZSIsImNyZWF0ZWRfYXQiLCJxdWVyeSIsImZyb20iLCJzZWxlY3QiLCJpbGlrZSIsImRhdGEiLCJlcnJvciIsInN0YXR1cyIsImpzb24iLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/expert_advisors.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/expert_advisors.js"));
module.exports = __webpack_exports__;

})();