'use strict';

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var path = require('path');
app.get('*', function(req, res) {
    res.sendfile(path.resolve('views/index.html'));
});
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
})

