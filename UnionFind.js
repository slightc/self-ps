function UnionFind(count) {
  this.roots = new Array(count);
  this.ranks = new Array(count);

  for (var i = 0; i < count; ++i) {
      this.roots[i] = i;
      this.ranks[i] = 0;
  }
}
// Two calls find(x) always return the same result, if link(..) has not been called in between (unique representatives)
UnionFind.prototype.find = function(x) {
  var x0 = x;
  var roots = this.roots;
  while (roots[x] != x)
      x = roots[x];

  while (roots[x0] != x) {
      var y = roots[x0];
      roots[x0] = x;
      x0 = y;
  }
  return x;
}

UnionFind.prototype.link = function(x, y) {
  var xr = this.find(x)
    , yr = this.find(y);
  if (xr == yr)
      return;

  var ranks = this.ranks
    , roots = this.roots
    , xd = ranks[xr]
    , yd = ranks[yr];

  if (xd < yd) {
      roots[xr] = yr;
  } else if (yd < xd) {
      roots[yr] = xr;
  } else {
      roots[yr] = xr;
      ++ranks[xr];
  }
}