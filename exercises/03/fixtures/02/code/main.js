(async function () {
  await import('./a').then((a) => {
    console.log('a = ' + a.default);

    import('./a').then((a) => {
      console.log('a = ' + a.default);
    });
  });

  await Promise.all([import('./b'), import('./b')]).then(([b1, b2]) => {
    console.log('b = ' + b1.default + ' b = ' + b2.default);
  });
})();
