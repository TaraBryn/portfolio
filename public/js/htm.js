export var htm = !function(){var n=function(t,e,u,r){for(var o=1;o<e.length;o++){var s=e[o],f="number"==typeof s?u[s]:s,p=e[++o];1===p?r[0]=f:3===p?r[1]=Object.assign(r[1]||{},f):5===p?(r[1]=r[1]||{})[e[++o]]=f:6===p?r[1][e[++o]]+=f+"":r.push(p?t.apply(null,n(t,f,u,["",null])):f)}return r},t=function(n){for(var t,e,u=1,r="",o="",s=[0],f=function(n){1===u&&(n||(r=r.replace(/^\s*\n\s*|\s*\n\s*$/g,"")))?s.push(n||r,0):3===u&&(n||r)?(s.push(n||r,1),u=2):2===u&&"..."===r&&n?s.push(n,3):2===u&&r&&!n?s.push(!0,5,r):u>=5&&((r||!n&&5===u)&&(s.push(r,u,e),u=6),n&&(s.push(n,u,e),u=6)),r=""},p=0;p<n.length;p++){p&&(1===u&&f(),f(p));for(var h=0;h<n[p].length;h++)t=n[p][h],1===u?"<"===t?(f(),s=[s],u=3):r+=t:4===u?"--"===r&&">"===t?(u=1,r=""):r=t+r[0]:o?t===o?o="":r+=t:'"'===t||"'"===t?o=t:">"===t?(f(),u=1):u&&("="===t?(u=5,e=r,r=""):"/"===t&&(u<5||">"===n[p][h+1])?(f(),3===u&&(s=s[0]),u=s,(s=s[0]).push(u,2),u=0):" "===t||"\t"===t||"\n"===t||"\r"===t?(f(),u=2):r+=t),3===u&&"!--"===r&&(u=4,s=s[0])}return f(),s},e="function"==typeof Map,u=e?new Map:{},r=e?function(n){var e=u.get(n);return e||u.set(n,e=t(n)),e}:function(n){for(var e="",r=0;r<n.length;r++)e+=n[r].length+"-"+n[r];return u[e]||(u[e]=t(n))},o=function(t){var e=n(this,r(t),arguments,[]);return e.length>1?e:e[0]};"undefined"!=typeof module?module.exports=o:self.htm=o}();