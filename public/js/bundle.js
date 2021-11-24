// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
// /* eslint-disable node/no-unsupported-features/es-syntax */
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
// // import '@babel/polyfill';
// import 'bootstrap';
// import { login, logout } from './login';
// import { createTeam, deleteTeam, updateTeam, fillForm } from './manageTeam';
// import { createPlayer, deletePlayer } from './managePlayers';
// import { addResult, updateResult } from './manageResults';
// import { detailPlayer } from './detailPlayer';
// import { resultDetail } from './resultDetail';
// import { createStreamer, deleteStreamer } from './manageStreamer';
// import { createNews, deleteNews } from './manageNews';
// const loginForm = document.querySelector('.form-login');
// const formAddTeam = document.querySelector('.form--addTeam');
// const formUpdateTeam = document.querySelector('.form--updateTeam');
// const editButton = document.querySelectorAll('.edit-team');
// const deleteButton = document.querySelectorAll('.delete-team');
// const formAddPlayer = document.querySelector('.form--addPlayer');
// const deletePlayerButton = document.querySelectorAll('.delete-player');
// const addResultButton = document.querySelectorAll('.button-add-result');
// const formUpdateResult = document.querySelector('.form--addResult');
// const buttonDetailPlayer = document.querySelectorAll('.btn-detail-player');
// const buttonResultDetail = document.querySelectorAll('.btn-result-detail');
// const formAddStreamer = document.querySelector('.form--addStreamer');
// const deleteStreamerButton = document.querySelectorAll('.delete-streamer');
// const formAddNews = document.querySelector('.form--addNews');
// const deleteNewsButton = document.querySelectorAll('.delete-news');
// const btnLogout = document.querySelector('.btn-logout');
// if (loginForm) {
//   loginForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     login(email, password);
//   });
// }
// if (formAddTeam) {
//   formAddTeam.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     const form = new FormData();
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;
//     form.append('name', document.getElementById('name').value);
//     form.append('shortName', document.getElementById('shortName').value);
//     form.append('achievement', document.getElementById('achievement').value);
//     form.append('description', document.getElementById('description').value);
//     form.append('logo', document.getElementById('logo').files[0]);
//     // console.log(document.getElementById('logo').files[0]);
//     createTeam(form);
//   });
// }
// if (formUpdateTeam) {
//   formUpdateTeam.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     const formU = new FormData();
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;
//     formU.append('name', document.getElementById('nameU').value);
//     formU.append('shortName', document.getElementById('shortNameU').value);
//     formU.append('achievement', document.getElementById('achievementU').value);
//     formU.append('description', document.getElementById('descriptionU').value);
//     formU.append('logo', document.getElementById('logoU').files[0]);
//     // console.log(document.getElementById('logo').files[0]);
//     updateTeam(formU, document.getElementById('teamId').value);
//   });
// }
// if (deleteButton) {
//   deleteButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       deleteTeam(button.dataset['id']);
//     });
//   });
// }
// if (editButton) {
//   editButton.forEach((button) => {
//     // console.log(button);
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       fillForm(button.dataset['id']);
//     });
//   });
// }
// if (addResultButton) {
//   addResultButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       addResult(button.dataset['id']);
//     });
//   });
// }
// if (formAddPlayer) {
//   formAddPlayer.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     const form = new FormData();
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;
//     form.append('nick', document.getElementById('nick').value);
//     form.append('idGame', document.getElementById('idGame').value);
//     form.append('name', document.getElementById('name').value);
//     form.append('instagram', document.getElementById('instagram').value);
//     form.append('photo', document.getElementById('photo').files[0]);
//     // console.log(document.getElementById('logo').files[0]);
//     createPlayer(form);
//   });
// }
// if (deletePlayerButton) {
//   deletePlayerButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       deletePlayer(button.dataset['id']);
//     });
//   });
// }
// if (formUpdateResult) {
//   formUpdateResult.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     let winner = '';
//     let loser = '';
//     if (
//       document.getElementById('winner').value ==
//       document.getElementById('team1').value
//     ) {
//       winner = document.getElementById('team1').value;
//       loser = document.getElementById('team2').value;
//     } else {
//       winner = document.getElementById('team2').value;
//       loser = document.getElementById('team1').value;
//     }
//     const mvp = [
//       document.getElementById('mvp1').value,
//       document.getElementById('mvp2').value,
//     ];
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;
//     const formR = {
//       win: winner,
//       lose: loser,
//       score: document.getElementById('score').value,
//       poinTimWin: document.getElementById('totalWinTimMenang').value,
//       poinTimLose: document.getElementById('totalWinTimKalah').value,
//       mvp,
//       finish: true,
//     };
//     updateResult(formR, document.getElementById('resultId').value);
//   });
// }
// if (buttonDetailPlayer) {
//   buttonDetailPlayer.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       detailPlayer(button.dataset['id']);
//     });
//   });
// }
// if (buttonResultDetail) {
//   buttonResultDetail.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       resultDetail(button.dataset['id']);
//     });
//   });
// }
// if (formAddStreamer) {
//   formAddStreamer.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     const form = new FormData();
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;
//     form.append('photo', document.getElementById('photo').files[0]);
//     createStreamer(form);
//   });
// }
// if (deleteStreamerButton) {
//   deleteStreamerButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       deleteStreamer(button.dataset['id']);
//     });
//   });
// }
// if (formAddNews) {
//   formAddNews.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // sama aja buat multipar/form-data
//     const form = new FormData();
//     // const name = document.getElementById('name').value;
//     // const shortName = document.getElementById('shortName').value;
//     form.append('photo', document.getElementById('photo').files[0]);
//     createNews(form);
//   });
// }
// if (deleteNewsButton) {
//   deleteNewsButton.forEach((button) => {
//     button.addEventListener('click', (e) => {
//       e.preventDefault();
//       deleteNews(button.dataset['id']);
//     });
//   });
// }
// if (btnLogout) {
//   btnLogout.addEventListener('click', logout);
// }
window.addEventListener('DOMContentLoaded', function (event) {
  // Activate Bootstrap scrollspy on the main nav element
  var mainNav = document.body.querySelector('#mainNav');

  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: '#mainNav',
      offset: 74
    });
  } // Collapse responsive navbar when toggler is visible


  var navbarToggler = document.body.querySelector('.navbar-toggler');
  var responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener('click', function () {
      if (window.getComputedStyle(navbarToggler).display !== 'none') {
        navbarToggler.click();
      }
    });
  });
});
},{}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60756" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/js/bundle.js.map