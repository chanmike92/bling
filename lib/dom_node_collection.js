class DOMNodeCollection {
  constructor(elArr) {
    this.elArr = elArr;
  }

  html(arg) {
    if (typeof arg === 'undefined') {
      return this.elArr[0].innerHTML;
    } else {
      this.elArr.forEach((el) => {
       el.innerHTML = arg;
     });
    }
  }

  empty() {
    this.html = "";
  }

  append(arg) {
    if (typeof arg === 'string') {
      this.elArr.forEach((el) => {
        el.innerHTML += arg;
      });
    }
    else if (arg instanceof HTMLElement) {
      this.elArr.forEach((el) => {
        el.innerHTML += arg.outerHTML;
      });
    }
    else if (arg instanceof DOMNodeCollection) {
      const limit = this.elArr.length;
      arg.elArr.forEach((argEl) => {
        for (var i = 0; i < limit; i++) {
          this.elArr[i].innerHTML += argEl.outerHTML;
        }
      });
    }
  }

  attr(name, value) {
    if (typeof value === 'undefined') {
      return this.elArr[0].getAttribute(name);
    } else {
    this.elArr[0].setAttribute(name, value);
    }
  }

  addClass(names) {
    this.elArr.forEach((el) => {
      el.classList.add(...name);
    });
  }

  removeClass(names) {
    this.elArr.forEach((el) => {
      el.classList.remove(...names);
    });
  }

  children() {
    const childrenArr = [];
    this.elArr.forEach((el) => {
      if (el.children.length === 0) {
        return this;
      } else {
        el.children.forEach((childNode) => {
          childrenArr.push(childNode);
        });
      }
    });
    const currentgen = new DOMNodeCollection(childrenArr);
    return currentgen.children();
  }

  parent() {
    const parentArr = [];
    this.elArr.forEach((el) => {
      parentArr.push(el.parentNode);
    });

    return parentArr;
  }

  find(selector) {
    const selectArr = [];
    this.elArr.forEach((el) => {
      el.querySelectorAll(selector).forEach(selectedEl => {
        selectArr.push(selectedEl);
      });
    });
    return selectArr;
  }

  remove() {
    this.elArr.forEach((el) => el.remove());
    this.elArr = [];
  }

  on(type, listener) {
    this.elArr.forEach((el) => {
      el[type] = listener;
      el.addEventListener(type, listener);
    });
  }

  off(type) {
    this.elArr.forEach((el) => {
      el.removeEventListener(type, el[type]);
    });
  }

}

module.exports = DOMNodeCollection;
