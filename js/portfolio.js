(function () {
  var filterBtns = document.querySelectorAll('.pf-filter-btn');
  var cards = document.querySelectorAll('.pf-card');
  var emptyMsg = document.getElementById('pf-empty');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      var filter = btn.getAttribute('data-filter');
      var visible = 0;

      cards.forEach(function (card) {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      emptyMsg.style.display = visible === 0 ? 'block' : 'none';
    });
  });
}());
