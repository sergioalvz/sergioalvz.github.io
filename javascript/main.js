const NAVIGATION_SELECTOR = '[data-go-to]';

class Navigation {
  onGoToClick(event) {
    event.preventDefault();

    const target = event.currentTarget.dataset.goTo;

    this.router.navigate({ path: target });
  }

  constructor({ router }) {
    this.router = router;
  }

  run() {
    document.querySelectorAll(NAVIGATION_SELECTOR).forEach(this.bindEventTo.bind(this));
  }

  bindEventTo(node) {
    node.addEventListener('click', this.onGoToClick.bind(this));
  }
}

class Router {
  onPopState(event) {
    const path = event.state;

    this.scroll(path);
  }

  constructor({ routes }) {
    this.routes = routes;
  }

  fallbackRoute() {
    const ROOT = '/';

    return this.routes[ROOT];
  }

  navigate({ path }) {
    this.push({ path });
    this.scroll({ path });
  }

  push({ path }) {
    const state = path === '/' ? '' : path;

    window.history.pushState({ path }, null, `#${state}`);
  }

  run() {
    window.addEventListener('popstate', this.onPopState.bind(this));

    setTimeout(() => {
      const initial = window.location.hash.slice(1);

      this.navigate({ path: initial });
    }, 0);
  }

  scroll({ path }) {
    const { anchor } = this.routes[path] || this.fallbackRoute();

    const $target = document.querySelector(anchor);

    Velocity($target, "scroll");
  }
}

const routes = {
  '/': {
    anchor: '.js-home'
  },
  'work': {
    anchor: '.js-work'
  },
  'about': {
    anchor: '.js-about'
  }
};

const router = new Router({ routes });
const navigation = new Navigation({ router });

router.run();
navigation.run();
