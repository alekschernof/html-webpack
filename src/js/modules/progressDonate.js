export default {
  init() {
    const progress = document.querySelectorAll('.js-chart-progress');
    if (progress === undefined || progress === null || progress.length === 0) {
      return;
    }
    function updateProgress(element, sumStart, sumEnd) {
      const progressLine = element.querySelector('.s-goal-donate__chart-line');
      const progressSum = (sumStart * 100) / sumEnd;
      if (progressSum >= 100) {
        progressLine.style.width = '100%';
      } else {
        progressLine.style.width = `${progressSum}%`;
      }
    }
    for (let i = 0; i < progress.length; i += 1) {
      const sumStart = progress[i].parentElement.querySelector('.s-goal-donate__sum._start').innerHTML.replace(/\s/g, '');
      const sumEnd = progress[i].parentElement.querySelector('.s-goal-donate__sum._end').innerHTML.replace(/\s/g, '');
      updateProgress(progress[i], sumStart, sumEnd);
    }
  },
};
