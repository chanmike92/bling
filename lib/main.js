const DOMNodeCollection = require('./dom_node_collection.js');

$b(() => {
  window.$b = $b;
  window.DOMNodeCollection = DOMNodeCollection;
  window.div = $b('div');
  window.div = $b('ul');
  window.div = $b('li');
});

function $b(input) {
  if (typeof input === "string") {
    let nodelist = document.querySelectorAll(input);
    let elArray = [];
    for (var i = 0; i < nodelist.length; i++) {
      elArray.push(nodelist[i]);
    }
    return new DOMNodeCollection(elArray);
  }
  else if (input instanceof HTMLElement) {
    return new DOMNodeCollection([input]);
  }
  else if (input instanceof Function) {
    let functionQueue = [];
    if (document.readyState === 'complete') {
      input();
    } else {
    functionQueue.push(input);
    document.addEventListener('DOMContentLoaded', (e) => {
      functionQueue.forEach((funct) => funct());
      functionQueue = [];
      });
    }
  }
}

$b.extend = (...objects) => {
  return Object.assign({}, ...objects);
};

$b.ajax = function(optionsObject) {
  const loadFunc = function () {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  };

  const defaults = {
    method: 'GET',
    url: window.location.href,
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    success: loadFunc,
  };

  const requestObj = this.extend(defaults, optionsObject);

  const reqPromise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(requestObj.method, requestObj.url);
    xhr.onload = resolve;
    xhr.onerror = reject;
    xhr.send(requestObj.data);
  });

  return reqPromise(requestObj.success, requestObj.error);
};
