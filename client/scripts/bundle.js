(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
! function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).dayjs = e()
}(this, (function () {
    "use strict";
    var t = 1e3,
        e = 6e4,
        n = 36e5,
        r = "millisecond",
        i = "second",
        s = "minute",
        u = "hour",
        a = "day",
        o = "week",
        f = "month",
        h = "quarter",
        c = "year",
        d = "date",
        $ = "Invalid Date",
        l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
        y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        M = {
            name: "en",
            weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
            months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
        },
        m = function (t, e, n) {
            var r = String(t);
            return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t
        },
        g = {
            s: m,
            z: function (t) {
                var e = -t.utcOffset(),
                    n = Math.abs(e),
                    r = Math.floor(n / 60),
                    i = n % 60;
                return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0")
            },
            m: function t(e, n) {
                if (e.date() < n.date()) return -t(n, e);
                var r = 12 * (n.year() - e.year()) + (n.month() - e.month()),
                    i = e.clone().add(r, f),
                    s = n - i < 0,
                    u = e.clone().add(r + (s ? -1 : 1), f);
                return +(-(r + (n - i) / (s ? i - u : u - i)) || 0)
            },
            a: function (t) {
                return t < 0 ? Math.ceil(t) || 0 : Math.floor(t)
            },
            p: function (t) {
                return {
                    M: f,
                    y: c,
                    w: o,
                    d: a,
                    D: d,
                    h: u,
                    m: s,
                    s: i,
                    ms: r,
                    Q: h
                } [t] || String(t || "").toLowerCase().replace(/s$/, "")
            },
            u: function (t) {
                return void 0 === t
            }
        },
        D = "en",
        v = {};
    v[D] = M;
    var p = function (t) {
            return t instanceof _
        },
        S = function (t, e, n) {
            var r;
            if (!t) return D;
            if ("string" == typeof t) v[t] && (r = t), e && (v[t] = e, r = t);
            else {
                var i = t.name;
                v[i] = t, r = i
            }
            return !n && r && (D = r), r || !n && D
        },
        w = function (t, e) {
            if (p(t)) return t.clone();
            var n = "object" == typeof e ? e : {};
            return n.date = t, n.args = arguments, new _(n)
        },
        O = g;
    O.l = S, O.i = p, O.w = function (t, e) {
        return w(t, {
            locale: e.$L,
            utc: e.$u,
            x: e.$x,
            $offset: e.$offset
        })
    };
    var _ = function () {
            function M(t) {
                this.$L = S(t.locale, null, !0), this.parse(t)
            }
            var m = M.prototype;
            return m.parse = function (t) {
                this.$d = function (t) {
                    var e = t.date,
                        n = t.utc;
                    if (null === e) return new Date(NaN);
                    if (O.u(e)) return new Date;
                    if (e instanceof Date) return new Date(e);
                    if ("string" == typeof e && !/Z$/i.test(e)) {
                        var r = e.match(l);
                        if (r) {
                            var i = r[2] - 1 || 0,
                                s = (r[7] || "0").substring(0, 3);
                            return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)
                        }
                    }
                    return new Date(e)
                }(t), this.$x = t.x || {}, this.init()
            }, m.init = function () {
                var t = this.$d;
                this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds()
            }, m.$utils = function () {
                return O
            }, m.isValid = function () {
                return !(this.$d.toString() === $)
            }, m.isSame = function (t, e) {
                var n = w(t);
                return this.startOf(e) <= n && n <= this.endOf(e)
            }, m.isAfter = function (t, e) {
                return w(t) < this.startOf(e)
            }, m.isBefore = function (t, e) {
                return this.endOf(e) < w(t)
            }, m.$g = function (t, e, n) {
                return O.u(t) ? this[e] : this.set(n, t)
            }, m.unix = function () {
                return Math.floor(this.valueOf() / 1e3)
            }, m.valueOf = function () {
                return this.$d.getTime()
            }, m.startOf = function (t, e) {
                var n = this,
                    r = !!O.u(e) || e,
                    h = O.p(t),
                    $ = function (t, e) {
                        var i = O.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
                        return r ? i : i.endOf(a)
                    },
                    l = function (t, e) {
                        return O.w(n.toDate()[t].apply(n.toDate("s"), (r ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e)), n)
                    },
                    y = this.$W,
                    M = this.$M,
                    m = this.$D,
                    g = "set" + (this.$u ? "UTC" : "");
                switch (h) {
                    case c:
                        return r ? $(1, 0) : $(31, 11);
                    case f:
                        return r ? $(1, M) : $(0, M + 1);
                    case o:
                        var D = this.$locale().weekStart || 0,
                            v = (y < D ? y + 7 : y) - D;
                        return $(r ? m - v : m + (6 - v), M);
                    case a:
                    case d:
                        return l(g + "Hours", 0);
                    case u:
                        return l(g + "Minutes", 1);
                    case s:
                        return l(g + "Seconds", 2);
                    case i:
                        return l(g + "Milliseconds", 3);
                    default:
                        return this.clone()
                }
            }, m.endOf = function (t) {
                return this.startOf(t, !1)
            }, m.$set = function (t, e) {
                var n, o = O.p(t),
                    h = "set" + (this.$u ? "UTC" : ""),
                    $ = (n = {}, n[a] = h + "Date", n[d] = h + "Date", n[f] = h + "Month", n[c] = h + "FullYear", n[u] = h + "Hours", n[s] = h + "Minutes", n[i] = h + "Seconds", n[r] = h + "Milliseconds", n)[o],
                    l = o === a ? this.$D + (e - this.$W) : e;
                if (o === f || o === c) {
                    var y = this.clone().set(d, 1);
                    y.$d[$](l), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d
                } else $ && this.$d[$](l);
                return this.init(), this
            }, m.set = function (t, e) {
                return this.clone().$set(t, e)
            }, m.get = function (t) {
                return this[O.p(t)]()
            }, m.add = function (r, h) {
                var d, $ = this;
                r = Number(r);
                var l = O.p(h),
                    y = function (t) {
                        var e = w($);
                        return O.w(e.date(e.date() + Math.round(t * r)), $)
                    };
                if (l === f) return this.set(f, this.$M + r);
                if (l === c) return this.set(c, this.$y + r);
                if (l === a) return y(1);
                if (l === o) return y(7);
                var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[l] || 1,
                    m = this.$d.getTime() + r * M;
                return O.w(m, this)
            }, m.subtract = function (t, e) {
                return this.add(-1 * t, e)
            }, m.format = function (t) {
                var e = this,
                    n = this.$locale();
                if (!this.isValid()) return n.invalidDate || $;
                var r = t || "YYYY-MM-DDTHH:mm:ssZ",
                    i = O.z(this),
                    s = this.$H,
                    u = this.$m,
                    a = this.$M,
                    o = n.weekdays,
                    f = n.months,
                    h = function (t, n, i, s) {
                        return t && (t[n] || t(e, r)) || i[n].substr(0, s)
                    },
                    c = function (t) {
                        return O.s(s % 12 || 12, t, "0")
                    },
                    d = n.meridiem || function (t, e, n) {
                        var r = t < 12 ? "AM" : "PM";
                        return n ? r.toLowerCase() : r
                    },
                    l = {
                        YY: String(this.$y).slice(-2),
                        YYYY: this.$y,
                        M: a + 1,
                        MM: O.s(a + 1, 2, "0"),
                        MMM: h(n.monthsShort, a, f, 3),
                        MMMM: h(f, a),
                        D: this.$D,
                        DD: O.s(this.$D, 2, "0"),
                        d: String(this.$W),
                        dd: h(n.weekdaysMin, this.$W, o, 2),
                        ddd: h(n.weekdaysShort, this.$W, o, 3),
                        dddd: o[this.$W],
                        H: String(s),
                        HH: O.s(s, 2, "0"),
                        h: c(1),
                        hh: c(2),
                        a: d(s, u, !0),
                        A: d(s, u, !1),
                        m: String(u),
                        mm: O.s(u, 2, "0"),
                        s: String(this.$s),
                        ss: O.s(this.$s, 2, "0"),
                        SSS: O.s(this.$ms, 3, "0"),
                        Z: i
                    };
                return r.replace(y, (function (t, e) {
                    return e || l[t] || i.replace(":", "")
                }))
            }, m.utcOffset = function () {
                return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
            }, m.diff = function (r, d, $) {
                var l, y = O.p(d),
                    M = w(r),
                    m = (M.utcOffset() - this.utcOffset()) * e,
                    g = this - M,
                    D = O.m(this, M);
                return D = (l = {}, l[c] = D / 12, l[f] = D, l[h] = D / 3, l[o] = (g - m) / 6048e5, l[a] = (g - m) / 864e5, l[u] = g / n, l[s] = g / e, l[i] = g / t, l)[y] || g, $ ? D : O.a(D)
            }, m.daysInMonth = function () {
                return this.endOf(f).$D
            }, m.$locale = function () {
                return v[this.$L]
            }, m.locale = function (t, e) {
                if (!t) return this.$L;
                var n = this.clone(),
                    r = S(t, e, !0);
                return r && (n.$L = r), n
            }, m.clone = function () {
                return O.w(this.$d, this)
            }, m.toDate = function () {
                return new Date(this.valueOf())
            }, m.toJSON = function () {
                return this.isValid() ? this.toISOString() : null
            }, m.toISOString = function () {
                return this.$d.toISOString()
            }, m.toString = function () {
                return this.$d.toUTCString()
            }, M
        }(),
        b = _.prototype;
    return w.prototype = b, [
        ["$ms", r],
        ["$s", i],
        ["$m", s],
        ["$H", u],
        ["$W", a],
        ["$M", f],
        ["$y", c],
        ["$D", d]
    ].forEach((function (t) {
        b[t[1]] = function (e) {
            return this.$g(e, t[0], t[1])
        }
    })), w.extend = function (t, e) {
        return t.$i || (t(e, _, w), t.$i = !0), w
    }, w.locale = S, w.isDayjs = p, w.unix = function (t) {
        return w(1e3 * t)
    }, w.en = v[D], w.Ls = v, w.p = {}, w
}));
},{}],2:[function(require,module,exports){
! function (r, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (r = "undefined" != typeof globalThis ? globalThis : r || self).dayjs_plugin_relativeTime = e()
}(this, (function () {
    "use strict";
    return function (r, e, t) {
        r = r || {};
        var n = e.prototype,
            o = {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            };

        function i(r, e, t, o) {
            return n.fromToBase(r, e, t, o)
        }
        t.en.relativeTime = o, n.fromToBase = function (e, n, i, d, u) {
            for (var f, a, s, l = i.$locale().relativeTime || o, h = r.thresholds || [{
                    l: "s",
                    r: 44,
                    d: "second"
                }, {
                    l: "m",
                    r: 89
                }, {
                    l: "mm",
                    r: 44,
                    d: "minute"
                }, {
                    l: "h",
                    r: 89
                }, {
                    l: "hh",
                    r: 21,
                    d: "hour"
                }, {
                    l: "d",
                    r: 35
                }, {
                    l: "dd",
                    r: 25,
                    d: "day"
                }, {
                    l: "M",
                    r: 45
                }, {
                    l: "MM",
                    r: 10,
                    d: "month"
                }, {
                    l: "y",
                    r: 17
                }, {
                    l: "yy",
                    d: "year"
                }], m = h.length, c = 0; c < m; c += 1) {
                var y = h[c];
                y.d && (f = d ? t(e).diff(i, y.d, !0) : i.diff(e, y.d, !0));
                var p = (r.rounding || Math.round)(Math.abs(f));
                if (s = f > 0, p <= y.r || !y.r) {
                    p <= 1 && c > 0 && (y = h[c - 1]);
                    var v = l[y.l];
                    u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n, y.l, s);
                    break
                }
            }
            if (n) return a;
            var M = s ? l.future : l.past;
            return "function" == typeof M ? M(a) : M.replace("%s", a)
        }, n.to = function (r, e) {
            return i(r, e, this, !0)
        }, n.from = function (r, e) {
            return i(r, e, this)
        };
        var d = function (r) {
            return r.$u ? t.utc() : t()
        };
        n.toNow = function (r) {
            return this.to(d(this), r)
        }, n.fromNow = function (r) {
            return this.from(d(this), r)
        }
    }
}));
},{}],3:[function(require,module,exports){
const submitButton = document.getElementById('quack-btn');
const imageButton = document.getElementById('add-image');
const sortMenu = document.getElementById('sortBy')
const searchSubmitButton = document.getElementById('search-posts-submit')
const inputBox = document.getElementById('quack-input');
const logo = document.getElementById('logo')
var dayjs = require('./dayjs/dayjs')
var relativeTime = require('./dayjs/plugin/relativeTime')
var isTrendingAdded = false;
dayjs.extend(relativeTime)
// const giphyURL = require('./giphy.js')

// console.log('now logging giphy url')
// console.log(giphyURL)

// const giphyURL = giphy.init()





imageButton.addEventListener('click', e => addImage(e))
submitButton.addEventListener('click', e => addQuack(e))
sortMenu.addEventListener('change', e => changeSort(e))
searchSubmitButton.addEventListener('click', e => giveSearchInput(e))
inputBox.addEventListener('keydown', e => changeDuck(e))
logo.addEventListener("mouseover", e => changeLogo(e))
logo.addEventListener("mouseout", e=> changeLogoBack(e))

function changeDuck(e) {
    const duckImage = document.getElementById('duck-img');
    duckImage.setAttribute('src', './images/duckGifV3.gif')
}

function makeDuckAngry() {
    const duckImage = document.getElementById('duck-img');
    duckImage.setAttribute('src', './images/Angry-alphabg-mouthopen.png')
}

function giveSearchInput(e) {
    console.log('clicked search input button')
    createPage();
}


function changeSort(e) {
    console.log('value changed')
    createPage()
}




function changeLogo(e) {
    console.log('mouse is over')
    logo.setAttribute('src', './images/flying-gif-shadow.gif')

}


function changeLogoBack(e) {
    logo.setAttribute('src', 'images/logo.png')
}



const reactionChoices = ['❤', '❓', '🔝']

// const axios = require('axios')

async function getAllPosts() {
    const posts = await fetch('https://quackerapi-nodejs.herokuapp.com/posts')
    const postsData = await posts.json()
    return postsData
}

//character limit function
function displayCharLimit() {
    let length = 0;
    const charLimit = 281;

    const remainingChars = document.getElementById('remaining-chars')
    inputBox.addEventListener('keyup', function (e) {
        length = this.value.length;
        if (length > charLimit) {
            return false
        } else if (length > 0) {
            remainingChars.textContent = `${charLimit-length} characters remaining`
        } else {
            remainingChars.textContent = `${charLimit} characters remaining`
        }
    })
}

function addImage() {

    const imageInputForm = document.getElementById('img-input')
    imageInputForm.classList.toggle('hidden')
    imageInputForm.classList.toggle('img-input-animation')
    // const topQuack = document.getElementById('top-quack')
    // const imageInputDiv = document.createElement('div');
    // const imageInputForm = document.createElement('input')
    // imageInputForm.setAttribute("type","text")
    // imageInputForm.setAttribute("placeholder","enter image url")
    // topQuack.appendChild(imageInputDiv);
    // imageInputDiv.appendChild(imageInputForm);
    //redundant code above

    //good code below

    const newImage = imageInputForm.value

}


const gifForm = document.getElementById('gifForm')
const gifBtn = document.getElementById('gifBtn')
gifBtn.addEventListener('click', e => hideGifInput(e))



function hideGifInput() {
    console.log('gif clicked')
    gifForm.classList.toggle('hidden')
    gifForm.classList.toggle('img-input-animation')
}


async function generateCard() {
    const posts = await fetch('https://quackerapi-nodejs.herokuapp.com/posts')

    let postsData = await posts.json()
    const selectionButton = document.getElementById('sortBy');
    const searchBar = document.getElementById('search-input')

    //searching logic
    //will manipulate postsData according to search queries
    //do this before checking selectionButton to allow filtering of items once searched

    if (searchBar.value !== "") {
        //search main text
        const searchQuery = searchBar.value
        let searched = [];
        searched = postsData.filter(mainTextContains)

        function mainTextContains(post) {
            const textArray = post.text.split(' ');
            return textArray.includes(searchQuery)
        }

        searchedInComments = postsData.filter(commentTextContains)

        function commentTextContains(post) {
            if (post.comments.length === 0) {
                return false;
            }
            for (let i = 0; i < post.comments.length; i++) {
                const textArray = post.comments[i].text.split(' ');
                if (textArray.includes(searchQuery)) {
                    return true
                }
            }

        }

        searchedInComments.forEach(e => searched.push(e))
        postsData = searched
    }
    //search comments
    //search by post id?



    //sort array by most reactions
    if (selectionButton.value === 'Hot') {
        postsData.sort((a, b) => sortByReactions(a, b))
    }

    function sortByReactions(a, b) {
        //a counter

        let acount = 0
        for (let i = 0; i < a.reactions.length; i++) {
            acount += a.reactions[i].count

        }

        let bcount = 0
        for (let i = 0; i < b.reactions.length; i++) {
            bcount += b.reactions[i].count
        }

        return acount - bcount;
    }
    //filter array by recent posts

    if (selectionButton.value === 'Fresh') {
        postsData = postsData.filter(isFresh)
    }

    function isFresh(post) {
        return dayjs().to(post.date, true).split(' ')[1] === 'minutes' || dayjs().to(post.date, true).split(' ')[2] === 'seconds'
    }

    //filter array by 'rising' - most reactions in last X minutes
    if (selectionButton.value === 'Rising') {
        postsData.sort(function risingFunction(a, b) {
            // we will compute the difference in dates between each post and the current date
            // and the number of reactions of the post
            // then compute the ratio of reactions / time taken
            // then sort by highest ratio
            const currentDate = dayjs()
            const aPostDate = a.date
            const bPostDate = b.date
            const aDiff = currentDate.diff(aPostDate)
            const bDiff = currentDate.diff(bPostDate)
            let acount = 0
            let bcount = 0
            for (let i = 0; i < a.reactions.length; i++) {
                acount += a.reactions[i].count
            }
            for (let i = 0; i < b.reactions.length; i++) {
                bcount += b.reactions[i].count
            }
            const aRatio = acount / aDiff
            const bRatio = bcount / bDiff
            return aRatio - bRatio
        })
    }

    const postBox = document.getElementById('quack-test-holder');
    postBox.innerHTML = ""
    for (let i = postsData.length - 1; i >= 0; i--) {
        //iterate backwards through array to give posts in chronological order
        const newPost = document.createElement('div');
        const newPostTitle = document.createElement('h2');
        const newPostBody = document.createElement('div');
        const newPostImage = document.createElement('img');
        const newPostGif = document.createElement('img')
        const newPostText = document.createElement('p')
        const newPostReactionsEtc = document.createElement('div')
        const currentReactions = document.createElement('div')
        const reactionsHolder = document.createElement('div')

        //give div the right children
        newPost.appendChild(newPostImage)
        newPost.appendChild(newPostGif)
        newPost.appendChild(newPostBody)
        newPostBody.appendChild(newPostTitle)
        newPostBody.appendChild(newPostText)
        newPostBody.appendChild(reactionsHolder)
        reactionsHolder.classList.add('reactions-div')
        newPostBody.appendChild(newPostReactionsEtc)
        //make it a card
        newPost.classList.add(`card`);
        newPost.setAttribute(`id`, `post-card-id-${postsData[i].id}`)
        newPostBody.classList.add('card-body');
        postBox.appendChild(newPost)
        newPostText.classList.add('card-text', 'fs-3');
        newPostImage.classList.add('card-img-top')
        newPostGif.classList.add('card-img-top')
        newPostReactionsEtc.classList.add('text-muted', 'quack-reactions')
        newPostText.textContent = postsData[i].text;
        newPostImage.setAttribute("src", `${postsData[i].picture}`)
        newPostGif.setAttribute("src", `${postsData[i].gif}`)
        //set the title
        const stringCombo = generateCombination(2, "-", postsData[i].id)
        newPostTitle.textContent = `Quack id ${stringCombo}`
        newPostTitle.classList.add('card-title', 'custom-card-title', 'text-muted')
        //add current reactions below the main text
        //we will add a button for each reaction choice, hopefully styled as a pill or something
        for (let k = 0; k < reactionChoices.length; k++) {
            const reactionButton = document.createElement('button')
            const currentReactionCount = postsData[i].reactions[k].count
            reactionButton.classList.add('btn', 'btn-outline-success', 'reaction-button')

            reactionButton.setAttribute('type', 'button')
            reactionButton.setAttribute('id', `reaction-button-${k}-${postsData[i].id}`)
            reactionButton.setAttribute('id-tag', `${postsData[i].id}`)
            reactionButton.setAttribute('reaction-tag', `${k+1}`)
            reactionButton.setAttribute('reaction-count', currentReactionCount)
            reactionButton.textContent = `${currentReactionCount} ${reactionChoices[k]}`
            reactionsHolder.append(reactionButton)
        }
        //comment and reaction icons
        //comment
        const cardCommentIcon = document.createElement('i')
        cardCommentIcon.classList.add('far', 'fa-comments', 'card-icons')
        newPostReactionsEtc.appendChild(cardCommentIcon)
        cardCommentIcon.setAttribute('id-tag', `${postsData[i].id}`)
        //reaction
        const cardReactionIcon = document.createElement('i')
        cardReactionIcon.classList.add('far', 'fa-heart', 'card-icons')
        newPostReactionsEtc.appendChild(cardReactionIcon)
        cardReactionIcon.setAttribute('id-tag', `${postsData[i].id}`)
        //timestamp
        const timeStamp = document.createElement('p')
        timeStamp.textContent = dayjs().to((postsData[i].date));
        newPostReactionsEtc.appendChild(timeStamp)
        timeStamp.classList.add('timeStamp')

        //card footer
        const cardFooter = document.createElement('div')
        cardFooter.classList.add('card-footer', 'text-muted')
        newPost.appendChild(cardFooter)
        //comments section title
        const commentsTitle = document.createElement('h4')
        commentsTitle.textContent = "Comments"
        cardFooter.appendChild(commentsTitle)
        //add comment box
        const commentBox = document.createElement('input');
        commentBox.setAttribute('type', 'text');
        commentBox.setAttribute('placeholder', 'write a comment')
        commentBox.setAttribute('id', `comment-box-${postsData[i].id}`)
        commentBox.classList.add('comment-input', 'hidden')
        cardFooter.appendChild(commentBox)

        //submit comment button
        const submitComment = document.createElement('input')
        submitComment.setAttribute('type', 'submit')
        submitComment.setAttribute('value', 'Submit comment')
        submitComment.setAttribute('id', `comment-button-${postsData[i].id}`)
        submitComment.classList.add('comment-button', 'hidden')
        cardFooter.appendChild(submitComment)
        submitComment.setAttribute('id-tag', `${postsData[i].id}`)



        //iterate through comments array and add each one to footer
        if (postsData[i].comments.length !== 0) {
            for (let j = 0; j < postsData[i].comments.length; j++) {
                const commentCard = document.createElement('div')
                commentCard.classList.add('card')
                const commentCardBody = document.createElement('div');
                commentCardBody.classList.add('card-body')
                const commentText = document.createElement('p');
                commentText.classList.add('commentText');
                const commentDate = document.createElement('p');
                commentDate.classList.add('timeStamp', 'commentDate');
                commentText.textContent = postsData[i].comments[j].text
                commentDate.textContent = dayjs().to(postsData[i].comments[j].date)
                commentCard.appendChild(commentCardBody);
                commentCardBody.appendChild(commentText);
                commentCardBody.appendChild(commentDate)
                cardFooter.appendChild(commentCard);
            }
        } else {
            const noCommentText = document.createElement('p')
            noCommentText.classList.add('no-comments-text')
            noCommentText.textContent = "no comments 😥 be the first?"
            cardFooter.appendChild(noCommentText)
        }






    }



    //adding 'trending tweet'
    // first check what type of sorting has been used 
    // if its 'hot' we can just grab the first child of the cards holder div
    // if its anything else, we need to sort by reaction count
    if (selectionButton.value === 'Hot' && !isTrendingAdded) {
        const holder = document.getElementById('quack-test-holder');
        const topCard = holder.firstChild;
        const trendingCard = topCard.cloneNode(true);
        trendingCard.setAttribute("id", 'top-trending-card');
        const elementToRemove = trendingCard.childNodes[3];
        trendingCard.removeChild(elementToRemove)
        // const elementToRemoveAgain = trendingCard.childNodes[3];
        // trendingCard.removeChild(elementToRemoveAgain)
        const trendingHolder = document.getElementById('trending')
        trendingHolder.appendChild(trendingCard)
        isTrendingAdded = true
    }
    // if its not hot
    // first get sorted array, then grab the ids of the top post
    else {
        postsData.sort((a, b) => sortByReactions(a, b))
        const topPostId = postsData[0].id
        const cardToCopy = document.getElementById(`post-card-id-${topPostId}`)
        const trendingCard = cardToCopy.cloneNode;
        trendingCard.setAttribute("id", 'top-trending-card')
        const elementToRemove = trendingCard.childNodes[3];
        trendingCard.removeChild(elementToRemove)
        // const elementToRemoveAgain = trendingCard.childNodes[3];
        // trendingCard.removeChild(elementToRemoveAgain)
        const trendingHolder = document.getElementById('trending')
        trendingHolder.appendChild(trendingCard)
    }

}





function addComment(postId) {
    const commentBox = document.getElementById(`comment-box-${postId}`);

    const commentText = commentBox.value;
    const currentTime = dayjs()

    if (commentText === "") {
        commentBox.setAttribute("placeholder", "write something!")

        return console.log('empty string detected');
    }
    //somehow get current id
    const id = postId
    //send patch request to post id with new comment
    const newComment = fetch(`https://quackerapi-nodejs.herokuapp.com/posts/${id}/comments`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "text": `${commentText}`,
            "date": `${currentTime}`
        })
    }).then(response => createPage())

}

function addReactionCount(postId, reactionId, currentReactionCount) {
    const newReaction = fetch(`https://quackerapi-nodejs.herokuapp.com/posts/${postId}/reactions/${reactionId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "count": currentReactionCount
        })
    }).then(response => createPage())
}

// giphy api stuff 
let fig = document.getElementById("figure");
let APIKEY = "91J9L3KzBaZxex6NxItZcvPTbFjKvQnn";
// you will need to get your own API KEY
// https://developers.giphy.com/dashboard/
document.addEventListener("DOMContentLoaded", previewGif);

function previewGif() {
    document.getElementById("previewGif").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page reload
        removePreview()
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        let out = document.querySelector(".out");

        if (out !== '') {
            out = ''
        }

        fetch(url)
            .then(response => response.json())
            .then(content => {

                console.log("this happened")



                let img = document.createElement("img");
                let fc = document.createElement("figcaption");
                img.src = content.data[0].images.fixed_width.url;
                img.alt = content.data[0].title;
                fc.textContent = content.data[0].title;
                fig.appendChild(img);
                fig.appendChild(fc);
                out = document.querySelector(".out");
                out.insertAdjacentElement("afterbegin", fig);


                return img.src;
            })
            .catch(err => {
                console.error(err);
            });
    });
}

document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page reload
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=10&q=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);

        fetch(url)
            .then(response => response.json())
            .then(content => {

                let fig = document.createElement("figure");
                let img = document.createElement("img");

                img.src = content.data[0].images.downsized.url;
                img.alt = content.data[0].title;
                document.querySelector("#search").value = content.data[0].images.downsized.url;


            })
            .catch(err => {
                console.error(err);
            });
    });
}

function removePreview() {
    fig.innerHTML = ""


}



function addQuack(e) {
    e.preventDefault();

    //send post data to server and then retrieve
    //first just console log the data that we get 
    const duckImage = document.getElementById('duck-img');
    duckImage.setAttribute('src', './images/happy.png')
    const quackBox = document.getElementById('quack-input');
    const postText = quackBox.value
    if (postText === "") {
        quackBox.setAttribute("placeholder", "You need to write something!")
        const duckImage = document.getElementById('duck-img');
        duckImage.setAttribute('src', './images/Angry-alphabg-mouthopen.png')
        return console.log('empty string detected');
    }
    const gifInputForm = document.getElementById('search')
    const gifForm = document.getElementById('gifForm')
    const imageInputForm = document.getElementById('img-input')
    //check if gif input form has anything - if so use that for image
    const newGif = gifInputForm.value;
    const newImage = imageInputForm.value;
    if (gifInputForm.value !== "" || gifInputForm.value.slice(0,4) !== "http") {
        console.log('error detected')
        gifInputForm.value = ""
        gifInputForm.setAttribute("placeholder","you need to click add GIF first")
        makeDuckAngry();
        return;
    }
    imageInputForm.value = ""
    gifInputForm.value = ""
    //check if hidden class exists before toggling
    if (!imageInputForm.classList.contains('hidden')) {
        imageInputForm.classList.toggle('hidden');

    }
    if (!gifForm.classList.contains('hidden')) {
        gifForm.classList.toggle('hidden')
    }

    removePreview()
    quackBox.value = ""
    const allPosts = getAllPosts()
    const newPost = fetch('https://quackerapi-nodejs.herokuapp.com/posts', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            //because we are using object destructuring in the router, we can send only the parameters we want
            //to be overwritten w.r.t default
            "text": `${postText}`,
            "picture": `${newImage}`,
            "gif": `${newGif}`,
            "reactions": [{
                id: 1,
                count: 0
            }, {
                id: 2,
                count: 0
            }, {
                id: 3,
                count: 0
            }],
            "comments": [],

        })
    }).then(response => {
        createPage()
    })

}

function createPage() {
    init()
    generateCard()
    makeCommentsWork()
    makeCommentIconsWork()
    makeReactionsWork()
    displayCharLimit()

}
createPage()


function makeCommentsWork() {
    const commentButtonsHTML = document.getElementsByClassName('comment-button')
    setTimeout(() => {
        const commentButtons = Array.from(commentButtonsHTML)

        for (let i = 0; i < commentButtons.length; i++) {
            commentButtons[i].addEventListener('click', function (e) {
                const postId = this.getAttribute("id-tag");
                addComment(postId);

            })
        }
    }, 1000)
}

function makeReactionsWork() {
    const reactionIcons = document.getElementsByClassName('reaction-button')

    setTimeout(() => {
        const reactionIconsArray = Array.from(reactionIcons)
        for (let i = 0; i < reactionIconsArray.length; i++) {
            reactionIconsArray[i].addEventListener('click', function (e) {

                const postId = this.getAttribute('id-tag')
                const reactionId = this.getAttribute('reaction-tag')
                const reactionCount = this.getAttribute('reaction-count')
                addReactionCount(postId, reactionId, reactionCount);
                //clientside change
                const currentValue = this.textContent
                const valueArray = currentValue.split(' ')
                this.textContent = `${parseInt(valueArray[0])+1} ${valueArray[1]}`
                this.classList.remove('btn-outline-success')
                this.classList.add('btn')


            }, {
                once: true
            })
        }
    }, 1000)
}

function toggleHidden(id) {
    const postId = id
    const hiddenBox = document.getElementById(`comment-box-${id}`)
    const hiddenButton = document.getElementById(`comment-button-${id}`)
    hiddenButton.classList.toggle('hidden')
    hiddenBox.classList.toggle('hidden');
}

function makeCommentIconsWork() {
    const cardIcons = document.getElementsByClassName('fa-comments')
    setTimeout(() => {
        const cardIconsArray = Array.from(cardIcons)
        for (let i = 0; i < cardIconsArray.length; i++) {
            cardIconsArray[i].addEventListener('click', function (e) {
                const postId = this.getAttribute('id-tag')
                toggleHidden(postId)
            })

        }
    }, 1000)
}

//animal id stuff - will move into different js files at some point
const animals = [
    'Aardvark',
    'Albatross',
    'Alligator',
    'Alpaca',
    'Ant',
    'Anteater',
    'Antelope',
    'Ape',
    'Armadillo',
    'Donkey',
    'Baboon',
    'Badger',
    'Barracuda',
    'Bat',
    'Bear',
    'Beaver',
    'Bee',
    'Bison',
    'Boar',
    'Buffalo',
    'Butterfly',
    'Camel',
    'Capybara',
    'Caribou',
    'Cassowary',
    'Cat',
    'Caterpillar',
    'Cattle',
    'Chamois',
    'Cheetah',
    'Chicken',
    'Chimpanzee',
    'Chinchilla',
    'Chough',
    'Clam',
    'Cobra',
    'Cockroach',
    'Cod',
    'Cormorant',
    'Coyote',
    'Crab',
    'Crane',
    'Crocodile',
    'Crow',
    'Curlew',
    'Deer',
    'Dinosaur',
    'Dog',
    'Dogfish',
    'Dolphin',
    'Dotterel',
    'Dove',
    'Dragonfly',
    'Duck',
    'Dugong',
    'Dunlin',
    'Eagle',
    'Echidna',
    'Eel',
    'Eland',
    'Elephant',
    'Elk',
    'Emu',
    'Falcon',
    'Ferret',
    'Finch',
    'Fish',
    'Flamingo',
    'Fly',
    'Fox',
    'Frog',
    'Gaur',
    'Gazelle',
    'Gerbil',
    'Giraffe',
    'Gnat',
    'Gnu',
    'Goat',
    'Goldfinch',
    'Goldfish',
    'Goose',
    'Gorilla',
    'Goshawk',
    'Grasshopper',
    'Grouse',
    'Guanaco',
    'Gull',
    'Hamster',
    'Hare',
    'Hawk',
    'Hedgehog',
    'Heron',
    'Herring',
    'Hippopotamus',
    'Hornet',
    'Horse',
    'Human',
    'Hummingbird',
    'Hyena',
    'Ibex',
    'Ibis',
    'Jackal',
    'Jaguar',
    'Jay',
    'Jellyfish',
    'Kangaroo',
    'Kingfisher',
    'Koala',
    'Kookabura',
    'Kouprey',
    'Kudu',
    'Lapwing',
    'Lark',
    'Lemur',
    'Leopard',
    'Lion',
    'Llama',
    'Lobster',
    'Locust',
    'Loris',
    'Louse',
    'Lyrebird',
    'Magpie',
    'Mallard',
    'Manatee',
    'Mandrill',
    'Mantis',
    'Marten',
    'Meerkat',
    'Mink',
    'Mole',
    'Mongoose',
    'Monkey',
    'Moose',
    'Mosquito',
    'Mouse',
    'Mule',
    'Narwhal',
    'Newt',
    'Nightingale',
    'Octopus',
    'Okapi',
    'Opossum',
    'Oryx',
    'Ostrich',
    'Otter',
    'Owl',
    'Oyster',
    'Panther',
    'Parrot',
    'Partridge',
    'Peafowl',
    'Pelican',
    'Penguin',
    'Pheasant',
    'Pig',
    'Pigeon',
    'Pony',
    'Porcupine',
    'Porpoise',
    'Quail',
    'Quelea',
    'Quetzal',
    'Rabbit',
    'Raccoon',
    'Rail',
    'Ram',
    'Rat',
    'Raven',
    'Reindeer',
    'Rhinoceros',
    'Rook',
    'Salamander',
    'Salmon',
    'Sandpiper',
    'Sardine',
    'Scorpion',
    'Seahorse',
    'Seal',
    'Shark',
    'Sheep',
    'Shrew',
    'Skunk',
    'Snail',
    'Snake',
    'Sparrow',
    'Spider',
    'Spoonbill',
    'Squid',
    'Squirrel',
    'Starling',
    'Stingray',
    'Stinkbug',
    'Stork',
    'Swallow',
    'Swan',
    'Tapir',
    'Tarsier',
    'Termite',
    'Tiger',
    'Toad',
    'Trout',
    'Turkey',
    'Turtle',
    'Viper',
    'Vulture',
    'Wallaby',
    'Walrus',
    'Wasp',
    'Weasel',
    'Whale',
    'Wildcat',
    'Wolf',
    'Wolverine',
    'Wombat',
    'Woodcock',
    'Woodpecker',
    'Worm',
    'Wren',
    'Yak',
    'Zebra'
];

const adjectives = ['aback',
    'abaft',
    'abandoned',
    'abashed',
    'aberrant',
    'abhorrent',
    'abiding',
    'abject',
    'ablaze',
    'able',
    'abnormal',
    'aboard',
    'aboriginal',
    'abortive',
    'abounding',
    'abrasive',
    'abrupt',
    'absent',
    'absorbed',
    'absorbing',
    'abstracted',
    'absurd',
    'abundant',
    'abusive',
    'acceptable',
    'accessible',
    'accidental',
    'accurate',
    'acid',
    'acidic',
    'acoustic',
    'acrid',
    'actually',
    'ad',
    'hoc',
    'adamant',
    'adaptable',
    'addicted',
    'adhesive',
    'adjoining',
    'adorable',
    'adventurous',
    'afraid',
    'aggressive',
    'agonizing',
    'agreeable',
    'ahead',
    'ajar',
    'alcoholic',
    'alert',
    'alike',
    'alive',
    'alleged',
    'alluring',
    'aloof',
    'amazing',
    'ambiguous',
    'ambitious',
    'amuck',
    'amused',
    'amusing',
    'ancient',
    'angry',
    'animated',
    'annoyed',
    'annoying',
    'anxious',
    'apathetic',
    'aquatic',
    'aromatic',
    'arrogant',
    'ashamed',
    'aspiring',
    'assorted',
    'astonishing',
    'attractive',
    'auspicious',
    'automatic',
    'available',
    'average',
    'awake',
    'aware',
    'awesome',
    'awful',
    'axiomatic',
    'bad',
    'barbarous',
    'bashful',
    'bawdy',
    'beautiful',
    'befitting',
    'belligerent',
    'beneficial',
    'bent',
    'berserk',
    'best',
    'better',
    'bewildered',
    'big',
    'billowy',
    'bite-sized',
    'bitter',
    'bizarre',
    'black',
    'black-and-white',
    'bloody',
    'blue',
    'blue-eyed',
    'blushing',
    'boiling',
    'boorish',
    'bored',
    'boring',
    'bouncy',
    'boundless',
    'brainy',
    'brash',
    'brave',
    'brawny',
    'breakable',
    'breezy',
    'brief',
    'bright',
    'bright',
    'broad',
    'broken',
    'brown',
    'bumpy',
    'burly',
    'bustling',
    'busy',
    'cagey',
    'calculating',
    'callous',
    'calm',
    'capable',
    'capricious',
    'careful',
    'careless',
    'caring',
    'cautious',
    'ceaseless',
    'certain',
    'changeable',
    'charming',
    'cheap',
    'cheerful',
    'chemical',
    'chief',
    'childlike',
    'chilly',
    'chivalrous',
    'chubby',
    'chunky',
    'clammy',
    'classy',
    'clean',
    'clear',
    'clever',
    'cloistered',
    'cloudy',
    'closed',
    'clumsy',
    'cluttered',
    'coherent',
    'cold',
    'colorful',
    'colossal',
    'combative',
    'comfortable',
    'common',
    'complete',
    'complex',
    'concerned',
    'condemned',
    'confused',
    'conscious',
    'cooing',
    'cool',
    'cooperative',
    'coordinated',
    'courageous',
    'cowardly',
    'crabby',
    'craven',
    'crazy',
    'creepy',
    'crooked',
    'crowded',
    'cruel',
    'cuddly',
    'cultured',
    'cumbersome',
    'curious',
    'curly',
    'curved',
    'curvy',
    'cut',
    'cute',
    'cute',
    'cynical',
    'daffy',
    'daily',
    'damaged',
    'damaging',
    'damp',
    'dangerous',
    'dapper',
    'dark',
    'dashing',
    'dazzling',
    'dead',
    'deadpan',
    'deafening',
    'dear',
    'debonair',
    'decisive',
    'decorous',
    'deep',
    'deeply',
    'defeated',
    'defective',
    'defiant',
    'delicate',
    'delicious',
    'delightful',
    'demonic',
    'delirious',
    'dependent',
    'depressed',
    'deranged',
    'descriptive',
    'deserted',
    'detailed',
    'determined',
    'devilish',
    'didactic',
    'different',
    'difficult',
    'diligent',
    'direful',
    'dirty',
    'disagreeable',
    'disastrous',
    'discreet',
    'disgusted',
    'disgusting',
    'disillusioned',
    'dispensable',
    'distinct',
    'disturbed',
    'divergent',
    'dizzy',
    'domineering',
    'doubtful',
    'drab',
    'draconian',
    'dramatic',
    'dreary',
    'drunk',
    'dry',
    'dull',
    'dusty',
    'dynamic',
    'dysfunctional',
    'eager',
    'early',
    'earsplitting',
    'earthy',
    'easy',
    'eatable',
    'economic',
    'educated',
    'efficacious',
    'efficient',
    'eight',
    'elastic',
    'elated',
    'elderly',
    'electric',
    'elegant',
    'elfin',
    'elite',
    'embarrassed',
    'eminent',
    'empty',
    'enchanted',
    'enchanting',
    'encouraging',
    'endurable',
    'energetic',
    'enormous',
    'entertaining',
    'enthusiastic',
    'envious',
    'equable',
    'equal',
    'erect',
    'erratic',
    'ethereal',
    'evanescent',
    'evasive',
    'even',
    'excellent',
    'excited',
    'exciting',
    'exclusive',
    'exotic',
    'expensive',
    'extra-large',
    'extra-small',
    'exuberant',
    'exultant',
    'fabulous',
    'faded',
    'faint',
    'fair',
    'faithful',
    'fallacious',
    'false',
    'familiar',
    'famous',
    'fanatical',
    'fancy',
    'fantastic',
    'far',
    'far-flung',
    'fascinated',
    'fast',
    'fat',
    'faulty',
    'fearful',
    'fearless',
    'feeble',
    'feigned',
    'female',
    'fertile',
    'festive',
    'few',
    'fierce',
    'filthy',
    'fine',
    'finicky',
    'first',
    'five',
    'fixed',
    'flagrant',
    'flaky',
    'flashy',
    'flat',
    'flawless',
    'flimsy',
    'flippant',
    'flowery',
    'fluffy',
    'fluttering',
    'foamy',
    'foolish',
    'foregoing',
    'forgetful',
    'fortunate',
    'four',
    'frail',
    'fragile',
    'frantic',
    'free',
    'freezing',
    'frequent',
    'fresh',
    'fretful',
    'friendly',
    'frightened',
    'frightening',
    'full',
    'fumbling',
    'functional',
    'funny',
    'furry',
    'furtive',
    'future',
    'futuristic',
    'fuzzy',
    'gabby',
    'gainful',
    'gamy',
    'gaping',
    'garrulous',
    'gaudy',
    'general',
    'gentle',
    'giant',
    'giddy',
    'gifted',
    'gigantic',
    'glamorous',
    'gleaming',
    'glib',
    'glistening',
    'glorious',
    'glossy',
    'godly',
    'good',
    'goofy',
    'gorgeous',
    'graceful',
    'grandiose',
    'grateful',
    'gratis',
    'gray',
    'greasy',
    'great',
    'greedy',
    'green',
    'grey',
    'grieving',
    'groovy',
    'grotesque',
    'grouchy',
    'grubby',
    'gruesome',
    'grumpy',
    'guarded',
    'guiltless',
    'gullible',
    'gusty',
    'guttural',
    'habitual',
    'half',
    'hallowed',
    'halting',
    'handsome',
    'handsomely',
    'handy',
    'hanging',
    'hapless',
    'happy',
    'hard',
    'hard-to-find',
    'harmonious',
    'harsh',
    'hateful',
    'heady',
    'healthy',
    'heartbreaking',
    'heavenly',
    'heavy',
    'hellish',
    'helpful',
    'helpless',
    'hesitant',
    'hideous',
    'high',
    'highfalutin',
    'high-pitched',
    'hilarious',
    'hissing',
    'historical',
    'holistic',
    'hollow',
    'homeless',
    'homely',
    'honorable',
    'horrible',
    'hospitable',
    'hot',
    'huge',
    'hulking',
    'humdrum',
    'humorous',
    'hungry',
    'hurried',
    'hurt',
    'hushed',
    'husky',
    'hypnotic',
    'hysterical',
    'icky',
    'icy',
    'idiotic',
    'ignorant',
    'ill',
    'illegal',
    'ill-fated',
    'ill-informed',
    'illustrious',
    'imaginary',
    'immense',
    'imminent',
    'impartial',
    'imperfect',
    'impolite',
    'important',
    'imported',
    'impossible',
    'incandescent',
    'incompetent',
    'inconclusive',
    'industrious',
    'incredible',
    'inexpensive',
    'infamous',
    'innate',
    'innocent',
    'inquisitive',
    'insidious',
    'instinctive',
    'intelligent',
    'interesting',
    'internal',
    'invincible',
    'irate',
    'irritating',
    'itchy',
    'jaded',
    'jagged',
    'jazzy',
    'jealous',
    'jittery',
    'jobless',
    'jolly',
    'joyous',
    'judicious',
    'juicy',
    'jumbled',
    'jumpy',
    'juvenile',
    'kaput',
    'keen',
    'kind',
    'kindhearted',
    'kindly',
    'knotty',
    'knowing',
    'knowledgeable',
    'known',
    'labored',
    'lackadaisical',
    'lacking',
    'lame',
    'lamentable',
    'languid',
    'large',
    'last',
    'late',
    'laughable',
    'lavish',
    'lazy',
    'lean',
    'learned',
    'left',
    'legal',
    'lethal',
    'level',
    'lewd',
    'light',
    'like',
    'likeable',
    'limping',
    'literate',
    'little',
    'lively',
    'lively',
    'living',
    'lonely',
    'long',
    'longing',
    'long-term',
    'loose',
    'lopsided',
    'loud',
    'loutish',
    'lovely',
    'loving',
    'low',
    'lowly',
    'lucky',
    'ludicrous',
    'lumpy',
    'lush',
    'luxuriant',
    'lying',
    'lyrical',
    'macabre',
    'macho',
    'maddening',
    'madly',
    'magenta',
    'magical',
    'magnificent',
    'majestic',
    'makeshift',
    'male',
    'malicious',
    'mammoth',
    'maniacal',
    'many',
    'marked',
    'massive',
    'married',
    'marvelous',
    'material',
    'materialistic',
    'mature',
    'mean',
    'measly',
    'meaty',
    'medical',
    'meek',
    'mellow',
    'melodic',
    'melted',
    'merciful',
    'mere',
    'messy',
    'mighty',
    'military',
    'milky',
    'mindless',
    'miniature',
    'minor',
    'miscreant',
    'misty',
    'mixed',
    'moaning',
    'modern',
    'moldy',
    'momentous',
    'motionless',
    'mountainous',
    'muddled',
    'mundane',
    'murky',
    'mushy',
    'mute',
    'mysterious',
    'naive',
    'nappy',
    'narrow',
    'nasty',
    'natural',
    'naughty',
    'nauseating',
    'near',
    'neat',
    'nebulous',
    'necessary',
    'needless',
    'needy',
    'neighborly',
    'nervous',
    'new',
    'next',
    'nice',
    'nifty',
    'nimble',
    'nine',
    'nippy',
    'noiseless',
    'noisy',
    'nonchalant',
    'nondescript',
    'nonstop',
    'normal',
    'nostalgic',
    'nosy',
    'noxious',
    'null',
    'numberless',
    'numerous',
    'nutritious',
    'nutty',
    'oafish',
    'obedient',
    'obeisant',
    'obese',
    'obnoxious',
    'obscene',
    'obsequious',
    'observant',
    'obsolete',
    'obtainable',
    'oceanic',
    'odd',
    'offbeat',
    'old',
    'old-fashioned',
    'omniscient',
    'one',
    'onerous',
    'open',
    'opposite',
    'optimal',
    'orange',
    'ordinary',
    'organic',
    'ossified',
    'outgoing',
    'outrageous',
    'outstanding',
    'oval',
    'overconfident',
    'overjoyed',
    'overrated',
    'overt',
    'overwrought',
    'painful',
    'painstaking',
    'pale',
    'paltry',
    'panicky',
    'panoramic',
    'parallel',
    'parched',
    'parsimonious',
    'past',
    'pastoral',
    'pathetic',
    'peaceful',
    'penitent',
    'perfect',
    'periodic',
    'permissible',
    'perpetual',
    'petite',
    'petite',
    'phobic',
    'physical',
    'picayune',
    'pink',
    'piquant',
    'placid',
    'plain',
    'plant',
    'plastic',
    'plausible',
    'pleasant',
    'plucky',
    'pointless',
    'poised',
    'polite',
    'political',
    'poor',
    'possessive',
    'possible',
    'powerful',
    'precious',
    'premium',
    'present',
    'pretty',
    'previous',
    'pricey',
    'prickly',
    'private',
    'probable',
    'productive',
    'profuse',
    'protective',
    'proud',
    'psychedelic',
    'psychotic',
    'public',
    'puffy',
    'pumped',
    'puny',
    'purple',
    'purring',
    'pushy',
    'puzzled',
    'puzzling',
    'quack',
    'quaint',
    'quarrelsome',
    'questionable',
    'quick',
    'quickest',
    'quiet',
    'quirky',
    'quixotic',
    'quizzical',
    'rabid',
    'racial',
    'ragged',
    'rainy',
    'rambunctious',
    'rampant',
    'rapid',
    'rare',
    'raspy',
    'ratty',
    'ready',
    'real',
    'rebel',
    'receptive',
    'recondite',
    'red',
    'redundant',
    'reflective',
    'regular',
    'relieved',
    'remarkable',
    'reminiscent',
    'repulsive',
    'resolute',
    'resonant',
    'responsible',
    'rhetorical',
    'rich',
    'right',
    'righteous',
    'rightful',
    'rigid',
    'ripe',
    'ritzy',
    'roasted',
    'robust',
    'romantic',
    'roomy',
    'rotten',
    'rough',
    'round',
    'royal',
    'ruddy',
    'rude',
    'rural',
    'rustic',
    'ruthless',
    'sable',
    'sad',
    'safe',
    'salty',
    'same',
    'sassy',
    'satisfying',
    'savory',
    'scandalous',
    'scarce',
    'scared',
    'scary',
    'scattered',
    'scientific',
    'scintillating',
    'scrawny',
    'screeching',
    'second',
    'second-hand',
    'secret',
    'secretive',
    'sedate',
    'seemly',
    'selective',
    'selfish',
    'separate',
    'serious',
    'shaggy',
    'shaky',
    'shallow',
    'sharp',
    'shiny',
    'shivering',
    'shocking',
    'short',
    'shrill',
    'shut',
    'shy',
    'sick',
    'silent',
    'silent',
    'silky',
    'silly',
    'simple',
    'simplistic',
    'sincere',
    'six',
    'skillful',
    'skinny',
    'sleepy',
    'slim',
    'slimy',
    'slippery',
    'sloppy',
    'slow',
    'small',
    'smart',
    'smelly',
    'smiling',
    'smoggy',
    'smooth',
    'sneaky',
    'snobbish',
    'snotty',
    'soft',
    'soggy',
    'solid',
    'somber',
    'sophisticated',
    'sordid',
    'sore',
    'sore',
    'sour',
    'sparkling',
    'special',
    'spectacular',
    'spicy',
    'spiffy',
    'spiky',
    'spiritual',
    'spiteful',
    'splendid',
    'spooky',
    'spotless',
    'spotted',
    'spotty',
    'spurious',
    'squalid',
    'square',
    'squealing',
    'squeamish',
    'staking',
    'stale',
    'standing',
    'statuesque',
    'steadfast',
    'steady',
    'steep',
    'stereotyped',
    'sticky',
    'stiff',
    'stimulating',
    'stingy',
    'stormy',
    'straight',
    'strange',
    'striped',
    'strong',
    'stupendous',
    'stupid',
    'sturdy',
    'subdued',
    'subsequent',
    'substantial',
    'successful',
    'succinct',
    'sudden',
    'sulky',
    'super',
    'superb',
    'superficial',
    'supreme',
    'swanky',
    'sweet',
    'sweltering',
    'swift',
    'symptomatic',
    'synonymous',
    'taboo',
    'tacit',
    'tacky',
    'talented',
    'tall',
    'tame',
    'tan',
    'tangible',
    'tangy',
    'tart',
    'tasteful',
    'tasteless',
    'tasty',
    'tawdry',
    'tearful',
    'tedious',
    'teeny',
    'teeny-tiny',
    'telling',
    'temporary',
    'ten',
    'tender',
    'tense',
    'tense',
    'tenuous',
    'terrible',
    'terrific',
    'tested',
    'testy',
    'thankful',
    'therapeutic',
    'thick',
    'thin',
    'thinkable',
    'third',
    'thirsty',
    'thoughtful',
    'thoughtless',
    'threatening',
    'three',
    'thundering',
    'tidy',
    'tight',
    'tightfisted',
    'tiny',
    'tired',
    'tiresome',
    'toothsome',
    'torpid',
    'tough',
    'towering',
    'tranquil',
    'trashy',
    'tremendous',
    'tricky',
    'trite',
    'troubled',
    'truculent',
    'true',
    'truthful',
    'two',
    'typical',
    'ubiquitous',
    'ugliest',
    'ugly',
    'ultra',
    'unable',
    'unaccountable',
    'unadvised',
    'unarmed',
    'unbecoming',
    'unbiased',
    'uncovered',
    'understood',
    'undesirable',
    'unequal',
    'unequaled',
    'uneven',
    'unhealthy',
    'uninterested',
    'unique',
    'unkempt',
    'unknown',
    'unnatural',
    'unruly',
    'unsightly',
    'unsuitable',
    'untidy',
    'unused',
    'unusual',
    'unwieldy',
    'unwritten',
    'upbeat',
    'uppity',
    'upset',
    'uptight',
    'used',
    'useful',
    'useless',
    'utopian',
    'utter',
    'uttermost',
    'vacuous',
    'vagabond',
    'vague',
    'valuable',
    'various',
    'vast',
    'vengeful',
    'venomous',
    'verdant',
    'versed',
    'victorious',
    'vigorous',
    'violent',
    'violet',
    'vivacious',
    'voiceless',
    'volatile',
    'voracious',
    'vulgar',
    'wacky',
    'waggish',
    'waiting',
    'wakeful',
    'wandering',
    'wanting',
    'warlike',
    'warm',
    'wary',
    'wasteful',
    'watery',
    'weak',
    'wealthy',
    'weary',
    'well-groomed',
    'well-made',
    'well-off',
    'well-to-do',
    'wet',
    'whimsical',
    'whispering',
    'white',
    'whole',
    'wholesale',
    'wicked',
    'wide',
    'wide-eyed',
    'wiggly',
    'wild',
    'willing',
    'windy',
    'wiry',
    'wise',
    'wistful',
    'witty',
    'woebegone',
    'womanly',
    'wonderful',
    'wooden',
    'woozy',
    'workable',
    'worried',
    'worthless',
    'wrathful',
    'wretched',
    'wrong',
    'wry',
    'xenophobic',
    'yellow',
    'yielding',
    'young',
    'youthful',
    'yummy',
    'zany',
    'zealous',
    'zesty',
    'zippy',
    'zonked'
];

function generateCombination(numAdjectives, delimiter, seed, capitalizeFirstLetter) {
    let combination = '';
    const randomIshOne = (seed * 9301 + 49297) % 233280
    const randomIshTwo = (seed * 8 * 9301 + 49297) % 233280
    const pseudoRandomOne = randomIshOne / 233280
    const pseudoRandomTwo = randomIshTwo / 233280

    const animal = animals[Math.floor(pseudoRandomOne * animals.length)];

    for (let i = 0; i < numAdjectives; i++) {
        const adjective = adjectives[(Math.floor(pseudoRandomTwo * (i + 1) * adjectives.length)) % adjectives.length];

        combination += capitalizeFirstLetter ? adjective.charAt(0).toUpperCase() + adjective.slice(1) + delimiter : adjective + delimiter;
    }

    combination += capitalizeFirstLetter ? animal.charAt(0).toUpperCase() + animal.slice(1) : animal;
    return combination;
}






// for (let i = 0; i < commentButtonsArray.length; i++)
// console.log(commentButtonsArray)
},{"./dayjs/dayjs":1,"./dayjs/plugin/relativeTime":2}]},{},[3]);
