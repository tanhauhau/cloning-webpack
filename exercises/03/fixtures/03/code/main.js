(async function () {
  const loadA = (await import('./a')).load;
  const loadB = (await import('./b')).load;

  console.log('a = ' + (await loadA()).default);
  console.log('b = ' + (await loadB()).default);
})();
