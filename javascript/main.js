function onGoToClick(event) {
  const target = event.currentTarget.dataset.goTo;
  const $target = document.querySelector(target);

  Velocity($target, "scroll");
}

document.querySelectorAll('[data-go-to]').forEach((node) => node.addEventListener('click', onGoToClick));


