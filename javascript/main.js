const NAVIGATION_NEXT_KEY = 'ArrowDown';
const NAVIGATION_PREV_KEY = 'ArrowUp';
const NAVIGATION_SELECTOR = '[data-go-to]';

class Navigation {
  onGoToClick(event) {
    event.preventDefault();

    const target = event.currentTarget.dataset.goTo;

    this.router.navigate({ path: target });
  }

  onKeyDown(event) {
    switch (event.key) {
      case NAVIGATION_NEXT_KEY:
        event.preventDefault();
        break;
      case NAVIGATION_PREV_KEY:
        event.preventDefault();
        break;
      default:
        return;
    }
  }

  onKeyUp(event) {
    switch (event.key) {
      case NAVIGATION_NEXT_KEY:
        event.preventDefault();

        this.router.next();
        break;
      case NAVIGATION_PREV_KEY:
        event.preventDefault();

        this.router.prev();
        break;
      default:
        return;
    }
  }

  constructor({ router }) {
    this.router = router;
  }

  run() {
    document.addEventListener('keyup', this.onKeyUp.bind(this));
    document.addEventListener('keydown', this.onKeyDown.bind(this));
    document.querySelectorAll(NAVIGATION_SELECTOR).forEach(this.bindEventTo.bind(this));
  }

  bindEventTo(node) {
    node.addEventListener('click', this.onGoToClick.bind(this));
  }
}

class Router {
  onPopState(event) {
    const pathObj = event.state;

    this.scroll(pathObj);
  }

  constructor({ routes }) {
    this.routes = routes;
  }

  fallbackRoute() {
    const ROOT = '';

    return this.routes[ROOT];
  }

  move({ direction }) {
    const routeName = this.path();
    const to = (this.routes[routeName] || {})[direction];

    this.navigate({ path: to });
  }

  navigate({ path, replace = false }) {
    if (!path && path !== '') {
      return;
    }

    if (replace) {
      this.replace({ path });
    } else {
      this.push({ path });
    }

    this.scroll({ path });
  }

  next() {
    this.move({ direction: 'next' });
  }

  path() {
    return window.location.hash.slice(1);
  }

  prev() {
    this.move({ direction: 'prev' });
  }

  push({ path }) {
    if (this.path() !== path) {
      window.history.pushState({ path }, null, `#${path}`);
    }
  }

  replace({ path }) {
    window.history.replaceState({ path }, null, `#${path}`);
  }

  run() {
    const initial = this.path();

    this.navigate({ path: initial, replace: true });

    window.addEventListener('popstate', this.onPopState.bind(this));
  }

  scroll({ path }) {
    const { anchor } = this.routes[path] || this.fallbackRoute();

    const $target = document.querySelector(anchor);

    Velocity($target, "scroll");
  }
}

const routes = {
  '': {
    anchor: '.js-home',
    next: 'work',
    prev: null
  },
  'work': {
    anchor: '.js-work',
    next: 'about',
    prev: ''
  },
  'about': {
    anchor: '.js-about',
    next: null,
    prev: 'work'
  }
};

const router = new Router({ routes });
const navigation = new Navigation({ router });

setTimeout(() => {
  router.run();
  navigation.run();
}, 0);
