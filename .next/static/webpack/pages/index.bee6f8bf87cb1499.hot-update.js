"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_supabaseClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/supabaseClient */ \"./src/supabaseClient.js\");\n/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-table */ \"./node_modules/react-table/index.js\");\n/* harmony import */ var react_table__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_table__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _s = $RefreshSig$();\n\n\n\nfunction Home() {\n    _s();\n    const [data, setData] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const fetchData = async ()=>{\n            let allData = [];\n            let page = 1;\n            let pageSize = 1000; // ขนาดของชุดข้อมูลที่ดึงมาแต่ละครั้ง\n            while(true){\n                const { data: userData , error  } = await _src_supabaseClient__WEBPACK_IMPORTED_MODULE_2__[\"default\"].from(\"list\").select(\"*\").order(\"id\", {\n                    ascending: false\n                }) // จัดเรียงข้อมูลโดย ID จากมากไปน้อย\n                .range((page - 1) * pageSize, page * pageSize - 1); // ดึงข้อมูลเป็นช่วง\n                if (error) {\n                    console.error(\"Error fetching data:\", error);\n                    break;\n                }\n                if (userData.length === 0) break; // ถ้าไม่มีข้อมูลแล้วให้หยุด\n                allData = [\n                    ...allData,\n                    ...userData\n                ];\n                page++;\n            }\n            setData(allData);\n            setLoading(false);\n        };\n        fetchData();\n    }, []);\n    const columns = react__WEBPACK_IMPORTED_MODULE_1___default().useMemo(()=>data.length > 0 ? Object.keys(data[0]).map((key)=>({\n                Header: key,\n                accessor: key\n            })) : [], [\n        data\n    ]);\n    const { getTableProps , getTableBodyProps , headerGroups , prepareRow , page , canPreviousPage , canNextPage , pageOptions , pageCount , gotoPage , nextPage , previousPage , setPageSize , state: { pageIndex , pageSize  }  } = (0,react_table__WEBPACK_IMPORTED_MODULE_3__.useTable)({\n        columns,\n        data,\n        initialState: {\n            pageIndex: 0,\n            pageSize: 100,\n            sortBy: [\n                {\n                    id: \"id\",\n                    desc: false\n                }\n            ]\n        }\n    }, react_table__WEBPACK_IMPORTED_MODULE_3__.useSortBy, react_table__WEBPACK_IMPORTED_MODULE_3__.usePagination);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"World Bot API\"\n            }, void 0, false, {\n                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                lineNumber: 86,\n                columnNumber: 7\n            }, this),\n            loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: \"Loading...\"\n            }, void 0, false, {\n                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                lineNumber: 88,\n                columnNumber: 9\n            }, this) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"table\", {\n                        ...getTableProps(),\n                        style: {\n                            border: \"1px solid black\",\n                            width: \"100%\",\n                            marginBottom: \"20px\"\n                        },\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"thead\", {\n                                children: headerGroups.map((headerGroup)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                        ...headerGroup.getHeaderGroupProps(),\n                                        style: {\n                                            background: \"#f0f0f0\"\n                                        },\n                                        children: headerGroup.headers.map((column)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"th\", {\n                                                ...column.getHeaderProps(column.getSortByToggleProps()),\n                                                style: {\n                                                    border: \"1px solid black\",\n                                                    padding: \"5px\",\n                                                    cursor: \"pointer\"\n                                                },\n                                                children: [\n                                                    column.render(\"Header\"),\n                                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                                        children: column.isSorted ? column.isSortedDesc ? \" \\uD83D\\uDD3D\" : \" \\uD83D\\uDD3C\" : \"\"\n                                                    }, void 0, false, {\n                                                        fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                                        lineNumber: 105,\n                                                        columnNumber: 23\n                                                    }, this)\n                                                ]\n                                            }, void 0, true, {\n                                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                                lineNumber: 96,\n                                                columnNumber: 21\n                                            }, this))\n                                    }, void 0, false, {\n                                        fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                        lineNumber: 94,\n                                        columnNumber: 17\n                                    }, this))\n                            }, void 0, false, {\n                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                lineNumber: 92,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tbody\", {\n                                ...getTableBodyProps(),\n                                children: page.map((row)=>{\n                                    prepareRow(row);\n                                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"tr\", {\n                                        ...row.getRowProps(),\n                                        children: row.cells.map((cell)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"td\", {\n                                                ...cell.getCellProps(),\n                                                style: {\n                                                    border: \"1px solid black\",\n                                                    padding: \"5px\",\n                                                    height: \"80px\",\n                                                    overflow: \"hidden\",\n                                                    textOverflow: \"ellipsis\",\n                                                    whiteSpace: \"nowrap\"\n                                                },\n                                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                                    style: {\n                                                        maxHeight: \"100%\",\n                                                        overflowY: \"auto\",\n                                                        whiteSpace: \"normal\",\n                                                        height: \"100%\"\n                                                    },\n                                                    children: cell.render(\"Cell\")\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                                    lineNumber: 134,\n                                                    columnNumber: 25\n                                                }, this)\n                                            }, void 0, false, {\n                                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                                lineNumber: 123,\n                                                columnNumber: 23\n                                            }, this))\n                                    }, void 0, false, {\n                                        fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                        lineNumber: 121,\n                                        columnNumber: 19\n                                    }, this);\n                                })\n                            }, void 0, false, {\n                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                lineNumber: 117,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                        lineNumber: 91,\n                        columnNumber: 11\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>gotoPage(0),\n                                disabled: !canPreviousPage,\n                                children: \"<<\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                lineNumber: 152,\n                                columnNumber: 13\n                            }, this),\n                            \" \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>previousPage(),\n                                disabled: !canPreviousPage,\n                                children: \"<\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                lineNumber: 155,\n                                columnNumber: 13\n                            }, this),\n                            \" \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>nextPage(),\n                                disabled: !canNextPage,\n                                children: \">\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                lineNumber: 158,\n                                columnNumber: 13\n                            }, this),\n                            \" \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                onClick: ()=>gotoPage(pageCount - 1),\n                                disabled: !canNextPage,\n                                children: \">>\"\n                            }, void 0, false, {\n                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                lineNumber: 161,\n                                columnNumber: 13\n                            }, this),\n                            \" \",\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                children: [\n                                    \"Page\",\n                                    \" \",\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"strong\", {\n                                        children: [\n                                            pageIndex + 1,\n                                            \" of \",\n                                            pageOptions.length\n                                        ]\n                                    }, void 0, true, {\n                                        fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                        lineNumber: 166,\n                                        columnNumber: 15\n                                    }, this),\n                                    \" \"\n                                ]\n                            }, void 0, true, {\n                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                lineNumber: 164,\n                                columnNumber: 13\n                            }, this),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"select\", {\n                                value: pageSize,\n                                onChange: (e)=>setPageSize(Number(e.target.value)),\n                                children: [\n                                    10,\n                                    20,\n                                    50,\n                                    100\n                                ].map((size)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"option\", {\n                                        value: size,\n                                        children: [\n                                            \"Show \",\n                                            size\n                                        ]\n                                    }, size, true, {\n                                        fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                        lineNumber: 175,\n                                        columnNumber: 17\n                                    }, this))\n                            }, void 0, false, {\n                                fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                                lineNumber: 170,\n                                columnNumber: 13\n                            }, this)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n                        lineNumber: 151,\n                        columnNumber: 11\n                    }, this)\n                ]\n            }, void 0, true)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/jakkarinchinsuwan/Desktop/WorldBotAPI/pages/index.js\",\n        lineNumber: 85,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"NHUFML2Apab5vi8Pu3SKwZZNDs4=\", false, function() {\n    return [\n        react_table__WEBPACK_IMPORTED_MODULE_3__.useTable\n    ];\n});\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NENBQUU7NENBQUtQLFlBQVlmLE1BQU07Ozs7Ozs7b0NBQzlCOzs7Ozs7OzBDQUVaLDhEQUFDTDtnQ0FDQ3lFLE9BQU83RTtnQ0FDUDhFLFVBQVUsQ0FBQ0MsSUFBTWxELFlBQVltRCxPQUFPRCxFQUFFRSxNQUFNLENBQUNKLEtBQUs7MENBRWpEO29DQUFDO29DQUFJO29DQUFJO29DQUFJO2lDQUFJLENBQUMvRCxHQUFHLENBQUMsQ0FBQ29FLHFCQUN0Qiw4REFBQ0M7d0NBQWtCTixPQUFPSzs7NENBQU07NENBQ3hCQTs7dUNBREtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs0QkFPdEI7Ozs7Ozs7QUFHUCxDQUFDO0dBcEx1QjFGOztRQTREbEJILGlEQUFRQTs7O0tBNURVRyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN1cGFiYXNlIGZyb20gJy4uL3NyYy9zdXBhYmFzZUNsaWVudCc7XG5pbXBvcnQgeyB1c2VUYWJsZSwgdXNlUGFnaW5hdGlvbiwgdXNlU29ydEJ5IH0gZnJvbSAncmVhY3QtdGFibGUnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShbXSk7XG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZmV0Y2hEYXRhID0gYXN5bmMgKCkgPT4ge1xuICAgICAgbGV0IGFsbERhdGEgPSBbXTtcbiAgICAgIGxldCBwYWdlID0gMTtcbiAgICAgIGxldCBwYWdlU2l6ZSA9IDEwMDA7IC8vIOC4guC4meC4suC4lOC4guC4reC4h+C4iuC4uOC4lOC4guC5ieC4reC4oeC4ueC4peC4l+C4teC5iOC4lOC4tuC4h+C4oeC4suC5geC4leC5iOC4peC4sOC4hOC4o+C4seC5ieC4h1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBjb25zdCB7IGRhdGE6IHVzZXJEYXRhLCBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAgICAgICAuZnJvbSgnbGlzdCcpXG4gICAgICAgICAgLnNlbGVjdCgnKicpXG4gICAgICAgICAgLm9yZGVyKCdpZCcsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KSAvLyDguIjguLHguJTguYDguKPguLXguKLguIfguILguYnguK3guKHguLnguKXguYLguJTguKIgSUQg4LiI4Liy4LiB4Lih4Liy4LiB4LmE4Lib4LiZ4LmJ4Lit4LiiXG4gICAgICAgICAgLnJhbmdlKChwYWdlIC0gMSkgKiBwYWdlU2l6ZSwgcGFnZSAqIHBhZ2VTaXplIC0gMSk7IC8vIOC4lOC4tuC4h+C4guC5ieC4reC4oeC4ueC4peC5gOC4m+C5h+C4meC4iuC5iOC4p+C4h1xuXG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGZldGNoaW5nIGRhdGE6JywgZXJyb3IpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHVzZXJEYXRhLmxlbmd0aCA9PT0gMCkgYnJlYWs7IC8vIOC4luC5ieC4suC5hOC4oeC5iOC4oeC4teC4guC5ieC4reC4oeC4ueC4peC5geC4peC5ieC4p+C5g+C4q+C5ieC4q+C4ouC4uOC4lFxuICAgICAgICBhbGxEYXRhID0gWy4uLmFsbERhdGEsIC4uLnVzZXJEYXRhXTtcbiAgICAgICAgcGFnZSsrO1xuICAgICAgfVxuXG4gICAgICBzZXREYXRhKGFsbERhdGEpO1xuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XG4gICAgfTtcblxuICAgIGZldGNoRGF0YSgpO1xuICB9LCBbXSk7XG5cbiAgY29uc3QgY29sdW1ucyA9IFJlYWN0LnVzZU1lbW8oXG4gICAgKCkgPT5cbiAgICAgIGRhdGEubGVuZ3RoID4gMFxuICAgICAgICA/IE9iamVjdC5rZXlzKGRhdGFbMF0pLm1hcCgoa2V5KSA9PiAoe1xuICAgICAgICAgICAgSGVhZGVyOiBrZXksXG4gICAgICAgICAgICBhY2Nlc3Nvcjoga2V5LFxuICAgICAgICAgIH0pKVxuICAgICAgICA6IFtdLFxuICAgIFtkYXRhXVxuICApO1xuXG4gIGNvbnN0IHtcbiAgICBnZXRUYWJsZVByb3BzLFxuICAgIGdldFRhYmxlQm9keVByb3BzLFxuICAgIGhlYWRlckdyb3VwcyxcbiAgICBwcmVwYXJlUm93LFxuICAgIHBhZ2UsXG4gICAgY2FuUHJldmlvdXNQYWdlLFxuICAgIGNhbk5leHRQYWdlLFxuICAgIHBhZ2VPcHRpb25zLFxuICAgIHBhZ2VDb3VudCxcbiAgICBnb3RvUGFnZSxcbiAgICBuZXh0UGFnZSxcbiAgICBwcmV2aW91c1BhZ2UsXG4gICAgc2V0UGFnZVNpemUsXG4gICAgc3RhdGU6IHsgcGFnZUluZGV4LCBwYWdlU2l6ZSB9LFxuICB9ID0gdXNlVGFibGUoXG4gICAge1xuICAgICAgY29sdW1ucyxcbiAgICAgIGRhdGEsXG4gICAgICBpbml0aWFsU3RhdGU6IHtcbiAgICAgICAgcGFnZUluZGV4OiAwLFxuICAgICAgICBwYWdlU2l6ZTogMTAwLFxuICAgICAgICBzb3J0Qnk6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogJ2lkJyxcbiAgICAgICAgICAgIGRlc2M6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdXNlU29ydEJ5LFxuICAgIHVzZVBhZ2luYXRpb25cbiAgKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDE+V29ybGQgQm90IEFQSTwvaDE+XG4gICAgICB7bG9hZGluZyA/IChcbiAgICAgICAgPHA+TG9hZGluZy4uLjwvcD5cbiAgICAgICkgOiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPHRhYmxlIHsuLi5nZXRUYWJsZVByb3BzKCl9IHN0eWxlPXt7IGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsIHdpZHRoOiAnMTAwJScsIG1hcmdpbkJvdHRvbTogJzIwcHgnIH19PlxuICAgICAgICAgICAgPHRoZWFkPlxuICAgICAgICAgICAgICB7aGVhZGVyR3JvdXBzLm1hcCgoaGVhZGVyR3JvdXApID0+IChcbiAgICAgICAgICAgICAgICA8dHIgey4uLmhlYWRlckdyb3VwLmdldEhlYWRlckdyb3VwUHJvcHMoKX0gc3R5bGU9e3sgYmFja2dyb3VuZDogJyNmMGYwZjAnIH19PlxuICAgICAgICAgICAgICAgICAge2hlYWRlckdyb3VwLmhlYWRlcnMubWFwKChjb2x1bW4pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPHRoXG4gICAgICAgICAgICAgICAgICAgICAgey4uLmNvbHVtbi5nZXRIZWFkZXJQcm9wcyhjb2x1bW4uZ2V0U29ydEJ5VG9nZ2xlUHJvcHMoKSl9XG4gICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlcjogJzFweCBzb2xpZCBibGFjaycsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiAnNXB4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICB7Y29sdW1uLnJlbmRlcignSGVhZGVyJyl9XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB7Y29sdW1uLmlzU29ydGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgID8gY29sdW1uLmlzU29ydGVkRGVzY1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJyDwn5S9J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyDwn5S8J1xuICAgICAgICAgICAgICAgICAgICAgICAgICA6ICcnfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC90aD5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keSB7Li4uZ2V0VGFibGVCb2R5UHJvcHMoKX0+XG4gICAgICAgICAgICAgIHtwYWdlLm1hcCgocm93KSA9PiB7XG4gICAgICAgICAgICAgICAgcHJlcGFyZVJvdyhyb3cpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICA8dHIgey4uLnJvdy5nZXRSb3dQcm9wcygpfT5cbiAgICAgICAgICAgICAgICAgICAge3Jvdy5jZWxscy5tYXAoKGNlbGwpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5jZWxsLmdldENlbGxQcm9wcygpfVxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkIGJsYWNrJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogJzgwcHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZVNwYWNlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAge2NlbGwucmVuZGVyKCdDZWxsJyl9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gZ290b1BhZ2UoMCl9IGRpc2FibGVkPXshY2FuUHJldmlvdXNQYWdlfT5cbiAgICAgICAgICAgICAgeyc8PCd9XG4gICAgICAgICAgICA8L2J1dHRvbj57JyAnfVxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBwcmV2aW91c1BhZ2UoKX0gZGlzYWJsZWQ9eyFjYW5QcmV2aW91c1BhZ2V9PlxuICAgICAgICAgICAgICB7JzwnfVxuICAgICAgICAgICAgPC9idXR0b24+eycgJ31cbiAgICAgICAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gbmV4dFBhZ2UoKX0gZGlzYWJsZWQ9eyFjYW5OZXh0UGFnZX0+XG4gICAgICAgICAgICAgIHsnPid9XG4gICAgICAgICAgICA8L2J1dHRvbj57JyAnfVxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBnb3RvUGFnZShwYWdlQ291bnQgLSAxKX0gZGlzYWJsZWQ9eyFjYW5OZXh0UGFnZX0+XG4gICAgICAgICAgICAgIHsnPj4nfVxuICAgICAgICAgICAgPC9idXR0b24+eycgJ31cbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICBQYWdleycgJ31cbiAgICAgICAgICAgICAgPHN0cm9uZz5cbiAgICAgICAgICAgICAgICB7cGFnZUluZGV4ICsgMX0gb2Yge3BhZ2VPcHRpb25zLmxlbmd0aH1cbiAgICAgICAgICAgICAgPC9zdHJvbmc+eycgJ31cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgdmFsdWU9e3BhZ2VTaXplfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFBhZ2VTaXplKE51bWJlcihlLnRhcmdldC52YWx1ZSkpfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7WzEwLCAyMCwgNTAsIDEwMF0ubWFwKChzaXplKSA9PiAoXG4gICAgICAgICAgICAgICAgPG9wdGlvbiBrZXk9e3NpemV9IHZhbHVlPXtzaXplfT5cbiAgICAgICAgICAgICAgICAgIFNob3cge3NpemV9XG4gICAgICAgICAgICAgICAgPC9vcHRpb24+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwic3VwYWJhc2UiLCJ1c2VUYWJsZSIsInVzZVBhZ2luYXRpb24iLCJ1c2VTb3J0QnkiLCJIb21lIiwiZGF0YSIsInNldERhdGEiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImZldGNoRGF0YSIsImFsbERhdGEiLCJwYWdlIiwicGFnZVNpemUiLCJ1c2VyRGF0YSIsImVycm9yIiwiZnJvbSIsInNlbGVjdCIsIm9yZGVyIiwiYXNjZW5kaW5nIiwicmFuZ2UiLCJjb25zb2xlIiwibGVuZ3RoIiwiY29sdW1ucyIsInVzZU1lbW8iLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwiSGVhZGVyIiwiYWNjZXNzb3IiLCJnZXRUYWJsZVByb3BzIiwiZ2V0VGFibGVCb2R5UHJvcHMiLCJoZWFkZXJHcm91cHMiLCJwcmVwYXJlUm93IiwiY2FuUHJldmlvdXNQYWdlIiwiY2FuTmV4dFBhZ2UiLCJwYWdlT3B0aW9ucyIsInBhZ2VDb3VudCIsImdvdG9QYWdlIiwibmV4dFBhZ2UiLCJwcmV2aW91c1BhZ2UiLCJzZXRQYWdlU2l6ZSIsInN0YXRlIiwicGFnZUluZGV4IiwiaW5pdGlhbFN0YXRlIiwic29ydEJ5IiwiaWQiLCJkZXNjIiwiZGl2IiwiaDEiLCJwIiwidGFibGUiLCJzdHlsZSIsImJvcmRlciIsIndpZHRoIiwibWFyZ2luQm90dG9tIiwidGhlYWQiLCJoZWFkZXJHcm91cCIsInRyIiwiZ2V0SGVhZGVyR3JvdXBQcm9wcyIsImJhY2tncm91bmQiLCJoZWFkZXJzIiwiY29sdW1uIiwidGgiLCJnZXRIZWFkZXJQcm9wcyIsImdldFNvcnRCeVRvZ2dsZVByb3BzIiwicGFkZGluZyIsImN1cnNvciIsInJlbmRlciIsInNwYW4iLCJpc1NvcnRlZCIsImlzU29ydGVkRGVzYyIsInRib2R5Iiwicm93IiwiZ2V0Um93UHJvcHMiLCJjZWxscyIsImNlbGwiLCJ0ZCIsImdldENlbGxQcm9wcyIsImhlaWdodCIsIm92ZXJmbG93IiwidGV4dE92ZXJmbG93Iiwid2hpdGVTcGFjZSIsIm1heEhlaWdodCIsIm92ZXJmbG93WSIsImJ1dHRvbiIsIm9uQ2xpY2siLCJkaXNhYmxlZCIsInN0cm9uZyIsInZhbHVlIiwib25DaGFuZ2UiLCJlIiwiTnVtYmVyIiwidGFyZ2V0Iiwic2l6ZSIsIm9wdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});