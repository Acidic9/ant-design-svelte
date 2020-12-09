import { S as SvelteComponent, j as init, l as safe_not_equal, D as update_slot, p as transition_in, q as transition_out, v as empty, k as insert, w as group_outros, r as check_outros, h as detach, I as component_subscribe, g as getContext, L as onMount, o as onDestroy, s as setContext, C as create_slot, y as assign, A as exclude_internal_props, e as create_component, m as mount_component, M as get_spread_update, N as get_spread_object, f as destroy_component, t as text, F as set_data, x as noop } from './common/index-8c41b410.js';
import { w as writable } from './common/index-1b42925e.js';

var strictUriEncode = str => encodeURIComponent(str).replace(/[!'()*]/g, x => `%${x.charCodeAt(0).toString(16).toUpperCase()}`);

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

var decodeUriComponent = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};

var splitOnFirst = (string, separator) => {
	if (!(typeof string === 'string' && typeof separator === 'string')) {
		throw new TypeError('Expected the arguments to be of type `string`');
	}

	if (separator === '') {
		return [string];
	}

	const separatorIndex = string.indexOf(separator);

	if (separatorIndex === -1) {
		return [string];
	}

	return [
		string.slice(0, separatorIndex),
		string.slice(separatorIndex + separator.length)
	];
};

function encoderForArrayFormat(options) {
	switch (options.arrayFormat) {
		case 'index':
			return key => (result, value) => {
				const index = result.length;
				if (value === undefined) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[', index, ']'].join('')];
				}

				return [
					...result,
					[encode(key, options), '[', encode(index, options), ']=', encode(value, options)].join('')
				];
			};

		case 'bracket':
			return key => (result, value) => {
				if (value === undefined) {
					return result;
				}

				if (value === null) {
					return [...result, [encode(key, options), '[]'].join('')];
				}

				return [...result, [encode(key, options), '[]=', encode(value, options)].join('')];
			};

		case 'comma':
			return key => (result, value, index) => {
				if (value === null || value === undefined || value.length === 0) {
					return result;
				}

				if (index === 0) {
					return [[encode(key, options), '=', encode(value, options)].join('')];
				}

				return [[result, encode(value, options)].join(',')];
			};

		default:
			return key => (result, value) => {
				if (value === undefined) {
					return result;
				}

				if (value === null) {
					return [...result, encode(key, options)];
				}

				return [...result, [encode(key, options), '=', encode(value, options)].join('')];
			};
	}
}

function parserForArrayFormat(options) {
	let result;

	switch (options.arrayFormat) {
		case 'index':
			return (key, value, accumulator) => {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return (key, value, accumulator) => {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		case 'comma':
			return (key, value, accumulator) => {
				const isArray = typeof value === 'string' && value.split('').indexOf(',') > -1;
				const newValue = isArray ? value.split(',') : value;
				accumulator[key] = newValue;
			};

		default:
			return (key, value, accumulator) => {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, options) {
	if (options.encode) {
		return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function decode$1(value, options) {
	if (options.decode) {
		return decodeUriComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	}

	if (typeof input === 'object') {
		return keysSorter(Object.keys(input))
			.sort((a, b) => Number(a) - Number(b))
			.map(key => input[key]);
	}

	return input;
}

function parseValue(value, options) {
	if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === 'string' && value.trim() !== '')) {
		value = Number(value);
	} else if (options.parseBooleans && value !== null && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
		value = value.toLowerCase() === 'true';
	}

	return value;
}

function parse(input, options) {
	options = Object.assign({
		decode: true,
		sort: true,
		arrayFormat: 'none',
		parseNumbers: false,
		parseBooleans: false
	}, options);

	const formatter = parserForArrayFormat(options);

	// Create an object with no prototype
	const ret = Object.create(null);

	if (typeof input !== 'string') {
		return ret;
	}

	input = input.trim().replace(/^[?#&]/, '');

	if (!input) {
		return ret;
	}

	for (const param of input.split('&')) {
		let [key, value] = splitOnFirst(param.replace(/\+/g, ' '), '=');

		// Missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		value = value === undefined ? null : decode$1(value, options);
		formatter(decode$1(key, options), value, ret);
	}

	for (const key of Object.keys(ret)) {
		const value = ret[key];
		if (typeof value === 'object' && value !== null) {
			for (const k of Object.keys(value)) {
				value[k] = parseValue(value[k], options);
			}
		} else {
			ret[key] = parseValue(value, options);
		}
	}

	if (options.sort === false) {
		return ret;
	}

	return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
		const value = ret[key];
		if (Boolean(value) && typeof value === 'object' && !Array.isArray(value)) {
			// Sort object keys, not values
			result[key] = keysSorter(value);
		} else {
			result[key] = value;
		}

		return result;
	}, Object.create(null));
}
var parse_1 = parse;

var stringify = (object, options) => {
	if (!object) {
		return '';
	}

	options = Object.assign({
		encode: true,
		strict: true,
		arrayFormat: 'none'
	}, options);

	const formatter = encoderForArrayFormat(options);
	const keys = Object.keys(object);

	if (options.sort !== false) {
		keys.sort(options.sort);
	}

	return keys.map(key => {
		const value = object[key];

		if (value === undefined) {
			return '';
		}

		if (value === null) {
			return encode(key, options);
		}

		if (Array.isArray(value)) {
			return value
				.reduce(formatter(key), [])
				.join('&');
		}

		return encode(key, options) + '=' + encode(value, options);
	}).filter(x => x.length > 0).join('&');
};

var defaultExport = /*@__PURE__*/(function (Error) {
  function defaultExport(route, path) {
    var message = "Unreachable '" + (route !== '/' ? route.replace(/\/$/, '') : route) + "', segment '" + path + "' is not defined";
    Error.call(this, message);
    this.message = message;
    this.route = route;
    this.path = path;
  }

  if ( Error ) defaultExport.__proto__ = Error;
  defaultExport.prototype = Object.create( Error && Error.prototype );
  defaultExport.prototype.constructor = defaultExport;

  return defaultExport;
}(Error));

function buildMatcher(path, parent) {
  var regex;

  var _isSplat;

  var _priority = -100;

  var keys = [];
  regex = path.replace(/[-$.]/g, '\\$&').replace(/\(/g, '(?:').replace(/\)/g, ')?').replace(/([:*]\w+)(?:<([^<>]+?)>)?/g, function (_, key, expr) {
    keys.push(key.substr(1));

    if (key.charAt() === ':') {
      _priority += 100;
      return ("((?!#)" + (expr || '[^#/]+?') + ")");
    }

    _isSplat = true;
    _priority += 500;
    return ("((?!#)" + (expr || '[^#]+?') + ")");
  });

  try {
    regex = new RegExp(("^" + regex + "$"));
  } catch (e) {
    throw new TypeError(("Invalid route expression, given '" + parent + "'"));
  }

  var _hashed = path.includes('#') ? 0.5 : 1;

  var _depth = path.length * _priority * _hashed;

  return {
    keys: keys,
    regex: regex,
    _depth: _depth,
    _isSplat: _isSplat
  };
}
var PathMatcher = function PathMatcher(path, parent) {
  var ref = buildMatcher(path, parent);
  var keys = ref.keys;
  var regex = ref.regex;
  var _depth = ref._depth;
  var _isSplat = ref._isSplat;
  return {
    _isSplat: _isSplat,
    _depth: _depth,
    match: function (value) {
      var matches = value.match(regex);

      if (matches) {
        return keys.reduce(function (prev, cur, i) {
          prev[cur] = typeof matches[i + 1] === 'string' ? decodeURIComponent(matches[i + 1]) : null;
          return prev;
        }, {});
      }
    }
  };
};

PathMatcher.push = function push (key, prev, leaf, parent) {
  var root = prev[key] || (prev[key] = {});

  if (!root.pattern) {
    root.pattern = new PathMatcher(key, parent);
    root.route = (leaf || '').replace(/\/$/, '') || '/';
  }

  prev.keys = prev.keys || [];

  if (!prev.keys.includes(key)) {
    prev.keys.push(key);
    PathMatcher.sort(prev);
  }

  return root;
};

PathMatcher.sort = function sort (root) {
  root.keys.sort(function (a, b) {
    return root[a].pattern._depth - root[b].pattern._depth;
  });
};

function merge(path, parent) {
  return ("" + (parent && parent !== '/' ? parent : '') + (path || ''));
}
function walk(path, cb) {
  var matches = path.match(/<[^<>]*\/[^<>]*>/);

  if (matches) {
    throw new TypeError(("RegExp cannot contain slashes, given '" + matches + "'"));
  }

  var parts = path.split(/(?=\/|#)/);
  var root = [];

  if (parts[0] !== '/') {
    parts.unshift('/');
  }

  parts.some(function (x, i) {
    var parent = root.slice(1).concat(x).join('') || null;
    var segment = parts.slice(i + 1).join('') || null;
    var retval = cb(x, parent, segment ? ("" + (x !== '/' ? x : '') + segment) : null);
    root.push(x);
    return retval;
  });
}
function reduce(key, root, _seen) {
  var params = {};
  var out = [];
  var splat;
  walk(key, function (x, leaf, extra) {
    var found;

    if (!root.keys) {
      throw new defaultExport(key, x);
    }

    root.keys.some(function (k) {
      if (_seen.includes(k)) { return false; }
      var ref = root[k].pattern;
      var match = ref.match;
      var _isSplat = ref._isSplat;
      var matches = match(_isSplat ? extra || x : x);

      if (matches) {
        Object.assign(params, matches);

        if (root[k].route) {
          var routeInfo = Object.assign({}, root[k].info); // properly handle exact-routes!

          var hasMatch = false;

          if (routeInfo.exact) {
            hasMatch = extra === null;
          } else {
            hasMatch = !(x && leaf === null) || x === leaf || _isSplat || !extra;
          }

          routeInfo.matches = hasMatch;
          routeInfo.params = Object.assign({}, params);
          routeInfo.route = root[k].route;
          routeInfo.path = _isSplat && extra || leaf || x;
          out.push(routeInfo);
        }

        if (extra === null && !root[k].keys) {
          return true;
        }

        if (k !== '/') { _seen.push(k); }
        splat = _isSplat;
        root = root[k];
        found = true;
        return true;
      }

      return false;
    });

    if (!(found || root.keys.some(function (k) { return root[k].pattern.match(x); }))) {
      throw new defaultExport(key, x);
    }

    return splat || !found;
  });
  return out;
}
function find(path, routes, retries) {
  var get = reduce.bind(null, path, routes);
  var set = [];

  while (retries > 0) {
    retries -= 1;

    try {
      return get(set);
    } catch (e) {
      if (retries > 0) {
        return get(set);
      }

      throw e;
    }
  }
}
function add(path, routes, parent, routeInfo) {
  var fullpath = merge(path, parent);
  var root = routes;
  var key;

  if (routeInfo && routeInfo.nested !== true) {
    key = routeInfo.key;
    delete routeInfo.key;
  }

  walk(fullpath, function (x, leaf) {
    root = PathMatcher.push(x, root, leaf, fullpath);

    if (x !== '/') {
      root.info = root.info || Object.assign({}, routeInfo);
    }
  });
  root.info = root.info || Object.assign({}, routeInfo);

  if (key) {
    root.info.key = key;
  }

  return fullpath;
}
function rm(path, routes, parent) {
  var fullpath = merge(path, parent);
  var root = routes;
  var leaf = null;
  var key = null;
  walk(fullpath, function (x) {
    if (!root) {
      leaf = null;
      return true;
    }

    if (!root.keys) {
      throw new defaultExport(path, x);
    }

    key = x;
    leaf = root;
    root = root[key];
  });

  if (!(leaf && key)) {
    throw new defaultExport(path, key);
  }

  if (leaf === routes) {
    leaf = routes['/'];
  }

  if (leaf.route !== key) {
    var offset = leaf.keys.indexOf(key);

    if (offset === -1) {
      throw new defaultExport(path, key);
    }

    leaf.keys.splice(offset, 1);
    PathMatcher.sort(leaf);
    delete leaf[key];
  } // nested routes are upgradeable, so keep original info...


  if (root.route === leaf.route && (!root.info || root.info.key === leaf.info.key)) { delete leaf.info; }
}

var Router = function Router() {
  var routes = {};
  var stack = [];
  return {
    resolve: function (path, cb) {
      var url = path.split('?')[0];
      var seen = [];
      walk(url, function (x, leaf, extra) {
        try {
          cb(null, find(leaf, routes, 1).filter(function (r) {
            if (!seen.includes(r.path)) {
              seen.push(r.path);
              return true;
            }

            return false;
          }));
        } catch (e) {
          cb(e, []);
        }
      });
    },
    mount: function (path, cb) {
      if (path !== '/') {
        stack.push(path);
      }

      cb();
      stack.pop();
    },
    find: function (path, retries) { return find(path, routes, retries === true ? 2 : retries || 1); },
    add: function (path, routeInfo) { return add(path, routes, stack.join(''), routeInfo); },
    rm: function (path) { return rm(path, routes, stack.join('')); }
  };
};

Router.matches = function matches (uri, path) {
  return buildMatcher(uri, path).regex.test(path);
};

function objectWithoutProperties (obj, exclude) { var target = {}; for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && exclude.indexOf(k) === -1) target[k] = obj[k]; return target; }

var cache = {};
var baseTag = document.getElementsByTagName('base');
var basePrefix = (baseTag[0] && baseTag[0].href) || '/';

var ROOT_URL = basePrefix.replace(window.location.origin, '');

var router = writable({
  path: '/',
  query: {},
  params: {},
  initial: true,
});

var CTX_ROUTER = {};
var CTX_ROUTE = {};

// use location.hash on embedded pages, e.g. Svelte REPL
var HASHCHANGE = window.location.origin === 'null';

function hashchangeEnable(value) {
  if (typeof value === 'boolean') {
    HASHCHANGE = !!value;
  }

  return HASHCHANGE;
}

function fixedLocation(path, callback, doFinally) {
  var baseUri = HASHCHANGE ? window.location.hash.replace('#', '') : window.location.pathname;

  // this will rebase anchors to avoid location changes
  if (path.charAt() !== '/') {
    path = baseUri + path;
  }

  var currentURL = baseUri + window.location.hash + window.location.search;

  // do not change location et all...
  if (currentURL !== path) {
    callback(path);
  }

  // invoke final guard regardless of previous result
  if (typeof doFinally === 'function') {
    doFinally();
  }
}

function cleanPath(uri, fix) {
  return uri !== '/' || fix ? uri.replace(/\/$/, '') : uri;
}

function navigateTo(path, options) {
  var ref = options || {};
  var reload = ref.reload;
  var replace = ref.replace;
  var params = ref.params;
  var queryParams = ref.queryParams;

  // If path empty or no string, throws error
  if (!path || typeof path !== 'string' || (path[0] !== '/' && path[0] !== '#')) {
    throw new Error(("Expecting '/" + path + "' or '#" + path + "', given '" + path + "'"));
  }

  if (params) {
    path = path.replace(/:([a-zA-Z][a-zA-Z0-9_-]*)/g, function (_, key) { return params[key]; });
  }

  if (queryParams) {
    var qs = stringify(queryParams);

    if (qs) {
      path += "?" + qs;
    }
  }

  if (HASHCHANGE) {
    var fixedURL = path.replace(/^#|#$/g, '');

    if (ROOT_URL !== '/') {
      fixedURL = fixedURL.replace(cleanPath(ROOT_URL), '');
    }

    window.location.hash = fixedURL !== '/' ? fixedURL : '';
    return;
  }

  // If no History API support, fallbacks to URL redirect
  if (reload || !window.history.pushState || !window.dispatchEvent) {
    window.location.href = path;
    return;
  }

  // If has History API support, uses it
  fixedLocation(path, function (nextURL) {
    window.history[replace ? 'replaceState' : 'pushState'](null, '', nextURL);
    window.dispatchEvent(new Event('popstate'));
  });
}

function getProps(given, required) {
  var sub = given.props;
  var rest = objectWithoutProperties( given, ["props"] );
  var others = rest;

  // prune all declared props from this component
  required.forEach(function (k) {
    delete others[k];
  });

  return Object.assign({}, sub,
    others);
}

function isActive(uri, path, exact) {
  if (!cache[[uri, path, exact]]) {
    if (exact !== true && path.indexOf(uri) === 0) {
      cache[[uri, path, exact]] = /^[#/?]?$/.test(path.substr(uri.length, 1));
    } else if (uri.includes('*') || uri.includes(':')) {
      cache[[uri, path, exact]] = Router.matches(uri, path);
    } else {
      cache[[uri, path, exact]] = cleanPath(path) === uri;
    }
  }

  return cache[[uri, path, exact]];
}

function isPromise(object) {
  return object && typeof object.then === 'function';
}

function isSvelteComponent(object) {
  return object && object.prototype;
}

var baseRouter = new Router();
var routeInfo = writable({});

// private registries
var onError = {};
var shared = {};

var errors = [];
var routers = 0;
var interval;
var currentURL;

// take snapshot from current state...
router.subscribe(function (value) { shared.router = value; });
routeInfo.subscribe(function (value) { shared.routeInfo = value; });

function doFallback(failure, fallback) {
  routeInfo.update(function (defaults) {
    var obj;

    return (Object.assign({}, defaults,
    ( obj = {}, obj[fallback] = Object.assign({}, shared.router,
      {failure: failure}), obj )));
  });
}

function handleRoutes(map, params) {
  var keys = [];

  map.some(function (x) {
    if (x.key && x.matches && !shared.routeInfo[x.key]) {
      if (x.redirect && (x.condition === null || x.condition(shared.router) !== true)) {
        if (x.exact && shared.router.path !== x.path) { return false; }
        navigateTo(x.redirect);
        return true;
      }

      if (x.exact) {
        keys.push(x.key);
      }

      // extend shared params...
      Object.assign(params, x.params);

      // upgrade matching routes!
      routeInfo.update(function (defaults) {
        var obj;

        return (Object.assign({}, defaults,
        ( obj = {}, obj[x.key] = Object.assign({}, shared.router,
          x), obj )));
      });
    }

    return false;
  });

  return keys;
}

function evtHandler() {
  var baseUri = !HASHCHANGE ? window.location.href.replace(window.location.origin, '') : window.location.hash || '/';
  var failure;

  // unprefix active URL
  if (ROOT_URL !== '/') {
    baseUri = baseUri.replace(cleanPath(ROOT_URL), '');
  }

  // skip given anchors if already exists on document, see #43
  if (
    /^#[\w-]+$/.test(window.location.hash)
    && document.querySelector(window.location.hash)
    && currentURL === baseUri.split('#')[0]
  ) { return; }

  // trailing slash is required to keep route-info on nested routes!
  // see: https://github.com/pateketrueke/abstract-nested-router/commit/0f338384bddcfbaee30f3ea2c4eb0c24cf5174cd
  var ref = baseUri.replace('/#', '#').replace(/^#\//, '/').split('?');
  var fixedUri = ref[0];
  var qs = ref[1];
  var fullpath = fixedUri.replace(/\/?$/, '/');
  var query = parse_1(qs);
  var params = {};
  var keys = [];

  // reset current state
  routeInfo.set({});

  if (currentURL !== baseUri) {
    currentURL = baseUri;
    router.set({
      path: cleanPath(fullpath),
      query: query,
      params: params,
    });
  }

  // load all matching routes...
  baseRouter.resolve(fullpath, function (err, result) {
    if (err) {
      failure = err;
      return;
    }

    // save exact-keys for deletion after failures!
    keys.push.apply(keys, handleRoutes(result, params));
  });

  var toDelete = {};

  // it's fine to omit failures for '/' paths
  if (failure && failure.path !== '/') {
    keys.reduce(function (prev, cur) {
      prev[cur] = null;
      return prev;
    }, toDelete);
  } else {
    failure = null;
  }

  // clear previously failed handlers
  errors.forEach(function (cb) { return cb(); });
  errors = [];

  try {
    // clear routes that not longer matches!
    baseRouter.find(cleanPath(fullpath))
      .forEach(function (sub) {
        if (sub.exact && !sub.matches) {
          toDelete[sub.key] = null;
        }
      });
  } catch (e) {
    // this is fine
  }

  // drop unwanted routes...
  routeInfo.update(function (defaults) { return (Object.assign({}, defaults,
    toDelete)); });

  var fallback;

  // invoke error-handlers to clear out previous state!
  Object.keys(onError).forEach(function (root) {
    if (isActive(root, fullpath, false)) {
      var fn = onError[root].callback;

      fn(failure);
      errors.push(fn);
    }

    if (!fallback && onError[root].fallback) {
      fallback = onError[root].fallback;
    }
  });

  // handle unmatched fallbacks
  if (failure && fallback) {
    doFallback(failure, fallback);
  }
}

function findRoutes() {
  clearTimeout(interval);
  interval = setTimeout(evtHandler);
}

function addRouter(root, fallback, callback) {
  if (!routers) {
    window.addEventListener('popstate', findRoutes, false);
  }

  // register error-handlers
  if (!onError[root] || fallback) {
    onError[root] = { fallback: fallback, callback: callback };
  }

  routers += 1;

  return function () {
    routers -= 1;

    if (!routers) {
      window.removeEventListener('popstate', findRoutes, false);
    }
  };
}

/* node_modules/yrv/build/lib/Router.svelte generated by Svelte v3.31.0 */

function create_if_block(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[6].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope*/ 32) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[5], dirty, null, null);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

function create_fragment(ctx) {
	let if_block_anchor;
	let current;
	let if_block = !/*disabled*/ ctx[0] && create_if_block(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!/*disabled*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*disabled*/ 1) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function unassignRoute(route) {
	try {
		baseRouter.rm(route);
	} catch(e) {
		
	} // 🔥 this is fine...

	findRoutes();
}

function instance($$self, $$props, $$invalidate) {
	let $basePath;
	let $router;
	component_subscribe($$self, router, $$value => $$invalidate(4, $router = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	let cleanup;
	let failure;
	let fallback;
	let { path = "/" } = $$props;
	let { disabled = false } = $$props;
	let { condition = null } = $$props;
	const routerContext = getContext(CTX_ROUTER);
	const basePath = routerContext ? routerContext.basePath : writable(path);
	component_subscribe($$self, basePath, value => $$invalidate(10, $basePath = value));

	const fixedRoot = $basePath !== path && $basePath !== "/"
	? `${$basePath}${path !== "/" ? path : ""}`
	: path;

	function assignRoute(key, route, detail) {
		key = key || Math.random().toString(36).substr(2);

		// consider as nested routes if they does not have any segment
		const nested = !route.substr(1).includes("/");

		const handler = { key, nested, ...detail };
		let fullpath;

		baseRouter.mount(fixedRoot, () => {
			fullpath = baseRouter.add(route, handler);
			fallback = handler.fallback && key || fallback;
		});

		findRoutes();
		return [key, fullpath];
	}

	function onError(err) {
		failure = err;

		if (failure && fallback) {
			doFallback(failure, fallback);
		}
	}

	onMount(() => {
		cleanup = addRouter(fixedRoot, fallback, onError);
	});

	onDestroy(() => {
		if (cleanup) cleanup();
	});

	setContext(CTX_ROUTER, { basePath, assignRoute, unassignRoute });

	$$self.$$set = $$props => {
		if ("path" in $$props) $$invalidate(2, path = $$props.path);
		if ("disabled" in $$props) $$invalidate(0, disabled = $$props.disabled);
		if ("condition" in $$props) $$invalidate(3, condition = $$props.condition);
		if ("$$scope" in $$props) $$invalidate(5, $$scope = $$props.$$scope);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*condition, $router*/ 24) {
			 if (condition) {
				$$invalidate(0, disabled = !condition($router));
			}
		}
	};

	return [disabled, basePath, path, condition, $router, $$scope, slots];
}

class Router$1 extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { path: 2, disabled: 0, condition: 3 });
	}
}

/* node_modules/yrv/build/lib/Route.svelte generated by Svelte v3.31.0 */

const get_default_slot_changes = dirty => ({
	router: dirty & /*activeRouter*/ 4,
	props: dirty & /*activeProps*/ 8
});

const get_default_slot_context = ctx => ({
	router: /*activeRouter*/ ctx[2],
	props: /*activeProps*/ ctx[3]
});

// (88:0) {#if activeRouter}
function create_if_block$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_1, create_if_block_4, create_else_block_1];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (!/*hasLoaded*/ ctx[4]) return 0;
		if (/*component*/ ctx[0]) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (100:4) {:else}
function create_else_block_1(ctx) {
	let current;
	const default_slot_template = /*#slots*/ ctx[15].default;
	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[14], get_default_slot_context);

	return {
		c() {
			if (default_slot) default_slot.c();
		},
		m(target, anchor) {
			if (default_slot) {
				default_slot.m(target, anchor);
			}

			current = true;
		},
		p(ctx, dirty) {
			if (default_slot) {
				if (default_slot.p && dirty & /*$$scope, activeRouter, activeProps*/ 16396) {
					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[14], dirty, get_default_slot_changes, get_default_slot_context);
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(default_slot, local);
			current = true;
		},
		o(local) {
			transition_out(default_slot, local);
			current = false;
		},
		d(detaching) {
			if (default_slot) default_slot.d(detaching);
		}
	};
}

// (98:4) {#if component}
function create_if_block_4(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ router: /*activeRouter*/ ctx[2] }, /*activeProps*/ ctx[3]];
	var switch_value = /*component*/ ctx[0];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = (dirty & /*activeRouter, activeProps*/ 12)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*activeRouter*/ 4 && { router: /*activeRouter*/ ctx[2] },
					dirty & /*activeProps*/ 8 && get_spread_object(/*activeProps*/ ctx[3])
				])
			: {};

			if (switch_value !== (switch_value = /*component*/ ctx[0])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

// (89:2) {#if !hasLoaded}
function create_if_block_1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*pending*/ ctx[1] && create_if_block_2(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (/*pending*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*pending*/ 2) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block_2(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (90:4) {#if pending}
function create_if_block_2(ctx) {
	let show_if;
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block_3, create_else_block];
	const if_blocks = [];

	function select_block_type_1(ctx, dirty) {
		if (dirty & /*pending*/ 2) show_if = !!isSvelteComponent(/*pending*/ ctx[1]);
		if (show_if) return 0;
		return 1;
	}

	current_block_type_index = select_block_type_1(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type_1(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if_blocks[current_block_type_index].d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

// (93:6) {:else}
function create_else_block(ctx) {
	let t;

	return {
		c() {
			t = text(/*pending*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, t, anchor);
		},
		p(ctx, dirty) {
			if (dirty & /*pending*/ 2) set_data(t, /*pending*/ ctx[1]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(t);
		}
	};
}

// (91:6) {#if isSvelteComponent(pending)}
function create_if_block_3(ctx) {
	let switch_instance;
	let switch_instance_anchor;
	let current;
	const switch_instance_spread_levels = [{ router: /*activeRouter*/ ctx[2] }, /*activeProps*/ ctx[3]];
	var switch_value = /*pending*/ ctx[1];

	function switch_props(ctx) {
		let switch_instance_props = {};

		for (let i = 0; i < switch_instance_spread_levels.length; i += 1) {
			switch_instance_props = assign(switch_instance_props, switch_instance_spread_levels[i]);
		}

		return { props: switch_instance_props };
	}

	if (switch_value) {
		switch_instance = new switch_value(switch_props());
	}

	return {
		c() {
			if (switch_instance) create_component(switch_instance.$$.fragment);
			switch_instance_anchor = empty();
		},
		m(target, anchor) {
			if (switch_instance) {
				mount_component(switch_instance, target, anchor);
			}

			insert(target, switch_instance_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const switch_instance_changes = (dirty & /*activeRouter, activeProps*/ 12)
			? get_spread_update(switch_instance_spread_levels, [
					dirty & /*activeRouter*/ 4 && { router: /*activeRouter*/ ctx[2] },
					dirty & /*activeProps*/ 8 && get_spread_object(/*activeProps*/ ctx[3])
				])
			: {};

			if (switch_value !== (switch_value = /*pending*/ ctx[1])) {
				if (switch_instance) {
					group_outros();
					const old_component = switch_instance;

					transition_out(old_component.$$.fragment, 1, 0, () => {
						destroy_component(old_component, 1);
					});

					check_outros();
				}

				if (switch_value) {
					switch_instance = new switch_value(switch_props());
					create_component(switch_instance.$$.fragment);
					transition_in(switch_instance.$$.fragment, 1);
					mount_component(switch_instance, switch_instance_anchor.parentNode, switch_instance_anchor);
				} else {
					switch_instance = null;
				}
			} else if (switch_value) {
				switch_instance.$set(switch_instance_changes);
			}
		},
		i(local) {
			if (current) return;
			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
			current = true;
		},
		o(local) {
			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(switch_instance_anchor);
			if (switch_instance) destroy_component(switch_instance, detaching);
		}
	};
}

function create_fragment$1(ctx) {
	let if_block_anchor;
	let current;
	let if_block = /*activeRouter*/ ctx[2] && create_if_block$1(ctx);

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (if_block) if_block.m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (/*activeRouter*/ ctx[2]) {
				if (if_block) {
					if_block.p(ctx, dirty);

					if (dirty & /*activeRouter*/ 4) {
						transition_in(if_block, 1);
					}
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				}
			} else if (if_block) {
				group_outros();

				transition_out(if_block, 1, 1, () => {
					if_block = null;
				});

				check_outros();
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (if_block) if_block.d(detaching);
			if (detaching) detach(if_block_anchor);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let $routePath;
	let $routeInfo;
	component_subscribe($$self, routeInfo, $$value => $$invalidate(13, $routeInfo = $$value));
	let { $$slots: slots = {}, $$scope } = $$props;
	let { key = null } = $$props;
	let { path = "/" } = $$props;
	let { exact = null } = $$props;
	let { pending = null } = $$props;
	let { disabled = false } = $$props;
	let { fallback = null } = $$props;
	let { component = null } = $$props;
	let { condition = null } = $$props;
	let { redirect = null } = $$props;

	// replacement for `Object.keys(arguments[0].$$.props)`
	const thisProps = [
		"key",
		"path",
		"exact",
		"pending",
		"disabled",
		"fallback",
		"component",
		"condition",
		"redirect"
	];

	const routeContext = getContext(CTX_ROUTE);
	const routerContext = getContext(CTX_ROUTER);
	const { assignRoute, unassignRoute } = routerContext || {};
	const routePath = routeContext ? routeContext.routePath : writable(path);
	component_subscribe($$self, routePath, value => $$invalidate(17, $routePath = value));
	let activeRouter = null;
	let activeProps = {};
	let fullpath;
	let hasLoaded;

	const fixedRoot = $routePath !== path && $routePath !== "/"
	? `${$routePath}${path !== "/" ? path : ""}`
	: path;

	function resolve() {
		const fixedRoute = path !== fixedRoot && fixedRoot.substr(-1) !== "/"
		? `${fixedRoot}/`
		: fixedRoot;

		$$invalidate(6, [key, fullpath] = assignRoute(key, fixedRoute, { condition, redirect, fallback, exact }), key);
	}

	resolve();

	onDestroy(() => {
		if (unassignRoute) {
			unassignRoute(fullpath);
		}
	});

	setContext(CTX_ROUTE, { routePath });

	$$self.$$set = $$new_props => {
		$$invalidate(25, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
		if ("key" in $$new_props) $$invalidate(6, key = $$new_props.key);
		if ("path" in $$new_props) $$invalidate(7, path = $$new_props.path);
		if ("exact" in $$new_props) $$invalidate(8, exact = $$new_props.exact);
		if ("pending" in $$new_props) $$invalidate(1, pending = $$new_props.pending);
		if ("disabled" in $$new_props) $$invalidate(9, disabled = $$new_props.disabled);
		if ("fallback" in $$new_props) $$invalidate(10, fallback = $$new_props.fallback);
		if ("component" in $$new_props) $$invalidate(0, component = $$new_props.component);
		if ("condition" in $$new_props) $$invalidate(11, condition = $$new_props.condition);
		if ("redirect" in $$new_props) $$invalidate(12, redirect = $$new_props.redirect);
		if ("$$scope" in $$new_props) $$invalidate(14, $$scope = $$new_props.$$scope);
	};

	$$self.$$.update = () => {
		 if (key) {
			$$invalidate(2, activeRouter = !disabled && $routeInfo[key]);
			$$invalidate(3, activeProps = getProps($$props, thisProps));
		}

		if ($$self.$$.dirty & /*activeRouter, component*/ 5) {
			 if (activeRouter) {
				if (!component) {
					// component passed as slot
					$$invalidate(4, hasLoaded = true);
				} else if (isSvelteComponent(component)) {
					// component passed as Svelte component
					$$invalidate(4, hasLoaded = true);
				} else if (isPromise(component)) {
					// component passed as import()
					component.then(module => {
						$$invalidate(0, component = module.default);
						$$invalidate(4, hasLoaded = true);
					});
				} else {
					// component passed as () => import()
					component().then(module => {
						$$invalidate(0, component = module.default);
						$$invalidate(4, hasLoaded = true);
					});
				}
			}
		}
	};

	$$props = exclude_internal_props($$props);

	return [
		component,
		pending,
		activeRouter,
		activeProps,
		hasLoaded,
		routePath,
		key,
		path,
		exact,
		disabled,
		fallback,
		condition,
		redirect,
		$routeInfo,
		$$scope,
		slots
	];
}

class Route extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$1, create_fragment$1, safe_not_equal, {
			key: 6,
			path: 7,
			exact: 8,
			pending: 1,
			disabled: 9,
			fallback: 10,
			component: 0,
			condition: 11,
			redirect: 12
		});
	}
}

Object.defineProperty(Router$1, 'hashchange', {
  set: function (value) { return hashchangeEnable(value); },
  get: function () { return hashchangeEnable(); },
  configurable: false,
  enumerable: false,
});

export { Route, Router$1 as Router, navigateTo };
