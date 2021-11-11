let l = {}
l.iG = function (N, G, b) {
    return .3 * N + .59 * G + .11 * b
}
l.Da = function (N, G, b, E, _) {
    debugger
    if (G.nJ(E) && (_ == null || _.nJ(E))) {
        l.g6(N, b);
        return
    }
    N = new Uint32Array(N.buffer),
        b = new Uint32Array(b.buffer);
    var H = G.tr(E);
    if (_)
        H = H.tr(_);
    var F = Math.max(0, H.x - G.x)
        , f = Math.max(0, H.x - E.x)
        , I = Math.max(0, H.y - G.y)
        , V = Math.max(0, H.y - E.y)
        , U = H.d
        , K = H.v
        , e = U & 3
        , P = e == 0 ? U : U - e;
    for (var T = 0; T < K; T++) {
        var A = (I + T) * G.d + F
            , S = (V + T) * E.d + f;
        b.set(new Uint32Array(N.buffer, A * 4, U), S)
    }
}
l.g6 = function (N, G) {
    var b = Math.min(N.buffer.byteLength, G.buffer.byteLength)
        , E = b >>> 2
        , N = new Uint32Array(N.buffer, 0, E)
        , G = new Uint32Array(G.buffer, 0, E);
    G.set(N)
}
    ;
l.tj = {}
l.tj.Um = function () {
    function N(K, e, P, A, S, Z, B) {
        if (S == 0) {
            e.set(K);
            return
        }
        if (S <= 80)
            G(K, e, P, A, S, Z, B);
        else
            H(K, e, P, A, S, Z, B)
    }
    function G(K, e, P, A, S, Z, B) {
        var j = 0
            , r = new Int32Array(512)
            , O = 1 + 2 * Math.round(Math.sqrt(S))
            , z = O >>> 1
            , D = new Array(O);
        for (var T = 0; T < O; T++)
            D[T] = new Int32Array(512);
        var Q = Z[0]
            , J = Z[1];
        for (var t = 0; t < P; t++)
            if (t < S || t > P - S - O - 1) {
                r.fill(0);
                j = 0;
                var u = Math.max(t - S, 0)
                    , R = Math.min(P, t + S + 1)
                    , k = R - u;
                for (var c = 0; c < S; c++) {
                    j += k;
                    E(r, K, c * P + u, c * P + R, 1)
                }
                for (var c = 0; c < A; c++) {
                    var h = c - S - 1
                        , w = c + S;
                    if (h >= 0) {
                        j -= k;
                        E(r, K, h * P + u, h * P + R, -1)
                    }
                    if (w < A) {
                        j += k;
                        E(r, K, w * P + u, w * P + R, 1)
                    }
                    var n = Q(r, K[c * P + t], j, B);
                    e[c * P + t] = n
                }
            } else {
                for (var T = 0; T < O; T++)
                    D[T].fill(0);
                j = 0;
                var u = t - S + z
                    , R = t + S + 1 + z
                    , k = R - u;
                for (var c = 0; c < S; c++) {
                    j += k;
                    b(D, K, c * P + u, c * P + R, 1, z)
                }
                for (var c = 0; c < A; c++) {
                    var h = c - S - 1
                        , w = c + S;
                    if (h >= 0) {
                        j -= k;
                        b(D, K, h * P + u, h * P + R, -1, z)
                    }
                    if (w < A) {
                        j += k;
                        b(D, K, w * P + u, w * P + R, 1, z)
                    }
                    for (var T = 0; T < z; T++) {
                        var x = z - 1 - T
                            , L = z + 1 + T;
                        e[c * P + t + x] = J(D[z], D[x], K[c * P + t + x], j, B);
                        e[c * P + t + L] = J(D[z], D[L], K[c * P + t + L], j, B)
                    }
                    e[c * P + t + z] = Q(D[z], K[c * P + t + z], j, B)
                }
                t += O - 1
            }
    }
    function b(K, e, P, A, S, Z) {
        var B = _;
        B(K[Z - 1], e[P - 1], 0, S);
        B(K[Z - 1], e[A - 1], 0, -S);
        B(K[Z + 1], e[A], 0, S);
        B(K[Z + 1], e[P], 0, -S);
        for (var T = 1; T < Z; T++) {
            var j = K[Z - T - 1]
                , r = K[Z + T + 1];
            for (var O = 0; O <= T; O++) {
                B(j, e[P - 1 - O], 0, S);
                B(j, e[A - 1 - O], 0, -S);
                B(r, e[A + O], 0, S);
                B(r, e[P + O], 0, -S)
            }
        }
        E(K[Z], e, P, A, S)
    }
    function E(K, e, T, P, A) {
        while (T < P)
            _(K, e[T++], 0, A)
    }
    function _(K, e, P, A) {
        K[P | e] += A;
        K[P | 256 | e >>> 4] += A
    }
    function H(K, e, P, A, S, Z, B) {
        var j = 0
            , r = new Int32Array(512)
            , O = new Int32Array(1 * P)
            , z = new Int32Array(512 * P)
            , D = Math.min(S, P)
            , Q = Math.min(S, A)
            , J = Z[0];
        for (var t = 0; t < Q; t++)
            F(z, O, K, P, t, 1);
        for (var t = 0; t < A; t++) {
            if (t + S < A)
                F(z, O, K, P, t + S, 1);
            if (t - S - 1 >= 0)
                F(z, O, K, P, t - S - 1, -1);
            r.fill(0);
            j = 0;
            for (var u = 0; u < D; u++) {
                j += O[u];
                f(r, z, u)
            }
            for (var u = 0; u < P; u++) {
                var R = u - S - 1
                    , k = u + S;
                if (R >= 0 && O[R] != 0) {
                    j -= O[R];
                    I(r, z, R)
                }
                if (k < P && O[k] != 0) {
                    j += O[k];
                    f(r, z, k)
                }
                var c = j == 0 ? 0 : J(r, K[t * P + u], j, B);
                e[t * P + u] = c
            }
        }
    }
    function F(K, e, P, A, S, Z) {
        var T = S * A;
        for (var B = 0; B < A; B++) {
            _(K, P[T + B], B << 9, Z);
            e[B] += Z
        }
    }
    function f(K, e, P) {
        for (var T = 0; T < 16; T++) {
            var A = e[P << 9 | 256 | T];
            if (A == 0)
                continue;
            K[256 | T] += A;
            var S = T << 4
                , Z = P << 9 | S;
            V(K, e, S, Z);
            V(K, e, S + 4, Z + 4);
            V(K, e, S + 8, Z + 8);
            V(K, e, S + 12, Z + 12)
        }
    }
    function I(K, e, P) {
        for (var T = 0; T < 16; T++) {
            var A = e[P << 9 | 256 | T];
            if (A == 0)
                continue;
            K[256 | T] -= A;
            var S = T << 4
                , Z = P << 9 | S;
            U(K, e, S, Z);
            U(K, e, S + 4, Z + 4);
            U(K, e, S + 8, Z + 8);
            U(K, e, S + 12, Z + 12)
        }
    }
    function V(K, e, P, A) {
        K[P] += e[A];
        K[P + 1] += e[A + 1];
        K[P + 2] += e[A + 2];
        K[P + 3] += e[A + 3]
    }
    function U(K, e, P, A) {
        K[P] -= e[A];
        K[P + 1] -= e[A + 1];
        K[P + 2] -= e[A + 2];
        K[P + 3] -= e[A + 3]
    }
    return N
}();

l.tj.zS = [function (N, G, b, E) {
    var T = 0;
    while (N[256 | T] == 0 && T < 15)
        T++;
    T = T << 4;
    while (N[T] == 0 && T < 255)
        T++;
    return T
}
    , function (N, G, b, E, _) {
        var T = 0;
        while (N[256 | T] + G[256 | T] == 0 && T < 15)
            T++;
        T = T << 4;
        while (N[T] + G[T] == 0 && T < 255)
            T++;
        return T
    }
];

l.Q = {};
l.Q.o6 = new Float64Array(256);
l.Q.rD = new Uint8Array(256 * 256);
l.Q.iS = new Uint8Array(256 * 256);
(function () {
    for (var T = 0; T < 256; T++)
        l.Q.o6[T] = 255 / T;
    for (var T = 0; T < 256; T++)
        for (var N = 0; N < 256; N++)
            l.Q.rD[T * 256 + N] = T == 0 ? 0 : Math.round(N * 255 / T);
    for (var T = 0; T < 256; T++)
        for (var N = 0; N < 256; N++)
            l.Q.iS[T * 256 + N] = Math.round(T * (255 - N) / 255)
}());
l.Q.E9 = function (N, G, b, E, _, H, F, f) {
    if (f == null)
        f = aV.q4();
    if ("idiv,lbrn,div ,lddg,vLit,lLit,hMix,diff".split(",").indexOf(N) == -1) {
        F = F * f.fill;
        f.fill = 1;
        f.style = !1
    }
    var I = "norm,dark,mul ,idiv,lbrn,lite,scrn,div ,lddg,over,sLit,hLit,vLit,lLit,pLit,hMix,diff,smud,fsub,fdiv".split(",")
        , V = "dkCl,lgCl,hue ,sat ,colr,lum ".split(",")
        , U = l.Q[N + "F"];
    if (f.ew == null && N == "norm")
        l.Q.a2F(G, b, E, _, H, F, U, f.HF ? 1 : 0);
    else if (N == "diss")
        l.Q.ao1(G, b, E, _, H, F, U, f.HF ? 1 : 0);
    else if (I.indexOf(N) != -1)
        l.Q.abh(G, b, E, _, H, F, U, f);
    else if (V.indexOf(N) != -1)
        l.Q.a75(G, b, E, _, H, F, U, f)
}
    ;

l.Q = {};
//   l.Q.o6 = new Float64Array(256);
//   l.Q.rD = new Uint8Array(256 * 256);
//   l.Q.iS = new Uint8Array(256 * 256);
//   (function() {
//       for (var T = 0; T < 256; T++)
//           l.Q.o6[T] = 255 / T;
//       for (var T = 0; T < 256; T++)
//           for (var N = 0; N < 256; N++)
//               l.Q.rD[T * 256 + N] = T == 0 ? 0 : Math.round(N * 255 / T);
//       for (var T = 0; T < 256; T++)
//           for (var N = 0; N < 256; N++)
//               l.Q.iS[T * 256 + N] = Math.round(T * (255 - N) / 255)
//   }());
l.Q.E9 = function (N, G, b, E, _, H, F, f) {
    if (f == null)
        f = aV.q4();
    if ("idiv,lbrn,div ,lddg,vLit,lLit,hMix,diff".split(",").indexOf(N) == -1) {
        F = F * f.fill;
        f.fill = 1;
        f.style = !1
    }
    var I = "norm,dark,mul ,idiv,lbrn,lite,scrn,div ,lddg,over,sLit,hLit,vLit,lLit,pLit,hMix,diff,smud,fsub,fdiv".split(",")
        , V = "dkCl,lgCl,hue ,sat ,colr,lum ".split(",")
        , U = l.Q[N + "F"];
    if (f.ew == null && N == "norm")
        l.Q.a2F(G, b, E, _, H, F, U, f.HF ? 1 : 0);
    else if (N == "diss")
        l.Q.ao1(G, b, E, _, H, F, U, f.HF ? 1 : 0);
    else if (I.indexOf(N) != -1)
        l.Q.abh(G, b, E, _, H, F, U, f);
    else if (V.indexOf(N) != -1)
        l.Q.a75(G, b, E, _, H, F, U, f)
}
    ;
l.Q.a2F = function (N, G, b, E, _, H, F, f) {
    var I = G.tr(E).tr(_)
        , V = Math.max(0, I.x - G.x)
        , U = Math.max(0, I.x - E.x)
        , K = Math.max(0, I.y - G.y)
        , e = Math.max(0, I.y - E.y)
        , P = I.d
        , A = I.v
        , S = G.d
        , Z = E.d
        , B = l.Q.rD
        , j = l.Q.iS
        , r = new Uint32Array(N.buffer)
        , O = new Uint32Array(b.buffer);
    for (var T = 0; T < A; T++) {
        var z = (K + T) * S + V
            , D = (e + T) * Z + U;
        for (var Q = 0; Q < P; Q++) {
            var J = r[z + Q]
                , R = 255;
            if (J >>> 24 == 0)
                continue;
            if (J >>> 24 == 255 && H == 1 && f == 0) {
                O[D + Q] = r[z + Q];
                continue
            }
            var t = O[D + Q]
                , u = 255 * H & 255;
            if (f == 0) {
                u = (J >>> 24) * H & 255;
                R = t >>> 24
            }
            var k = j[R << 8 | u]
                , c = u + k
                , h = J & 255
                , w = J >>> 8 & 255
                , n = J >>> 16 & 255
                , x = t & 255
                , L = t >>> 8 & 255
                , $ = t >>> 16 & 255;
            O[D + Q] = f * (t >>> 24) + (1 - f) * c << 24 | B[c << 8 | l.V_(n * u + $ * k)] << 16 | B[c << 8 | l.V_(w * u + L * k)] << 8 | B[c << 8 | l.V_(h * u + x * k)]
        }
    }
}
    ;

l.Q.ao1 = function (N, G, b, E, _, H, F, f) {
    var I = 1 / 255
        , V = I * H
        , U = Math.round(H * (256 * 256 * 256 / 255))
        , K = G.tr(E).tr(_)
        , e = Math.max(0, K.x - G.x)
        , P = Math.max(0, K.x - E.x)
        , A = Math.max(0, K.y - G.y)
        , S = Math.max(0, K.y - E.y)
        , Z = K.d
        , B = K.v
        , j = new Uint32Array(N.buffer)
        , r = new Uint32Array(b.buffer);
    for (var T = 0; T < B; T++) {
        var O = (A + T) * G.d + e
            , z = (S + T) * E.d + P;
        for (var D = 0; D < Z; D++,
            O++,
            z++) {
            var Q = j[O]
                , J = r[z]
                , t = f * 255 + (1 - f) * (Q >>> 24);
            if ((l.Q.Xc(O) & 16777215) >= t * U)
                continue;
            r[z] = Q & 16777215 | f * (J >>> 24) + (1 - f) * 255 << 24
        }
    }
}
    ;

l.Q.Xc = function (N) {
    N = N ^ 61 ^ N >>> 16;
    N = N + (N << 3);
    N = N ^ N >>> 4;
    N = N * 668265261;
    N = N ^ N >>> 15;
    return N
}
    ;

l.Q.M6 = function (N, G, b, E, _, H, F, f) {
    var I = l.iG(N, G, b)
        , V = l.iG(E, _, H)
        , U = Math.min
        , K = l.Q.a0X
        , e = K(I, f, 0);
    e = U(e, K(N, f, 8));
    e = U(e, K(G, f, 16));
    e = U(e, K(b, f, 24));
    var P = K(V, f, 4);
    P = U(P, K(E, f, 12));
    P = U(P, K(_, f, 20));
    P = U(P, K(H, f, 28));
    P = Math.max(P, 1 - F);
    var A = Math.min(e, P);
    return A < 0 ? 0 : A > 1 ? 1 : A
}

l.Q.a0X = function (N, G, T) {
    return Math.min((N - G[T]) * G[T + 1], (N - G[T + 3]) * G[T + 2])
}

l.Q.abh = function(N, G, b, E, _, H, F, f) {
    var I = 1 / 255
      , V = I * H
      , U = f.HF ? 1 : 0
      , K = f.fill
      , e = f.style
      , P = G.tr(E).tr(_)
      , A = Math.max(0, P.x - G.x)
      , S = Math.max(0, P.x - E.x)
      , Z = Math.max(0, P.y - G.y)
      , B = Math.max(0, P.y - E.y)
      , j = P.d
      , r = P.v
      , O = G.d
      , z = E.d
      , D = new Uint32Array(N.buffer)
      , Q = new Uint32Array(b.buffer);
    for (var T = 0; T < r; T++) {
        var J = (Z + T) * O + A
          , t = (B + T) * z + S;
        for (var u = 0; u < j; u++,
        J++,
        t++) {
            var R = D[J]
              , X = 1;
            if (R >>> 24 == 0)
                continue;
            var k = Q[t]
              , c = (R & 255) * I
              , h = (R >>> 8 & 255) * I
              , w = (R >>> 16 & 255) * I
              , n = (k & 255) * I
              , x = (k >>> 8 & 255) * I
              , L = (k >>> 16 & 255) * I
              , $ = H;
            if (U == 0) {
                $ = (R >>> 24) * V;
                X = (k >>> 24) * I
            }
            if (f.ew)
                $ *= l.Q.M6(c, h, w, n, x, L, X, f.ew);
            var i = X * (1 - $)
              , q = $ + i
              , o = q == 0 ? 0 : 255 / q
              , s = e ? 1 : $
              , g = ((1 - X) * $ * c + (1 - s) * X * n + s * X * F(c, n, (1 + $ - s) * K)) * o
              , iO = ((1 - X) * $ * h + (1 - s) * X * x + s * X * F(h, x, (1 + $ - s) * K)) * o
              , f1 = ((1 - X) * $ * w + (1 - s) * X * L + s * X * F(w, L, (1 + $ - s) * K)) * o;
            q = $ * K + X * (1 - $ * K);
            var gl = ~~(q * 255 + .5);
            Q[t] = U * (k >>> 24) + (1 - U) * gl << 24 | f1 << 16 | iO << 8 | g
        }
    }
}
;

l.Q.a75 = function(N, G, b, E, _, H, F, f) {
    var I = 1 / 255
      , V = I * H
      , U = f.HF ? 1 : 0
      , K = G.tr(E).tr(_)
      , e = Math.max(0, K.x - G.x)
      , P = Math.max(0, K.x - E.x)
      , A = Math.max(0, K.y - G.y)
      , S = Math.max(0, K.y - E.y)
      , Z = K.d
      , B = K.v
      , j = new Uint32Array(N.buffer)
      , r = new Uint32Array(b.buffer)
      , O = {
        h: 0,
        l: 0,
        O: 0
    }
      , z = {
        h: 0,
        l: 0,
        O: 0
    }
      , D = {
        h: 0,
        l: 0,
        O: 0
    };
    for (var T = 0; T < B; T++) {
        var Q = (A + T) * G.d + e
          , J = (S + T) * E.d + P;
        for (var t = 0; t < Z; t++,
        Q++,
        J++) {
            var u = j[Q]
              , R = r[J]
              , k = (u & 255) * I
              , c = (u >>> 8 & 255) * I
              , h = (u >>> 16 & 255) * I
              , w = (R & 255) * I
              , n = (R >>> 8 & 255) * I
              , x = (R >>> 16 & 255) * I
              , L = H
              , $ = 1;
            if (U == 0) {
                L = (u >>> 24) * V;
                $ = (R >>> 24) * I
            }
            if (f.ew)
                L *= l.Q.M6(k, c, h, w, n, x, $, f.ew);
            var X = $ * (1 - L)
              , i = L + X
              , q = 255 / i;
            O.h = k;
            O.l = c;
            O.O = h;
            z.h = w;
            z.l = n;
            z.O = x;
            F(O, z, D);
            var o = (((1 - $) * k + $ * D.h) * L + w * X) * q
              , s = (((1 - $) * c + $ * D.l) * L + n * X) * q
              , g = (((1 - $) * h + $ * D.O) * L + x * X) * q
              , iO = U * (R >>> 24) + (1 - U) * Math.round(i * 255);
            r[J] = iO << 24 | g << 16 | s << 8 | o
        }
    }
}
;