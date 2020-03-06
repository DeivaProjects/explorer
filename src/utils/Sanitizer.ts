import BadWords from "bad-words";
import Censorify from "censorify-it";

export class Sanitizer {
  // Taken from https://github.com/boutetnico/url-shorteners/blob/master/list.txt
  private readonly shortUrls = [
    "0rz.tw",
    "1-url.net",
    "126.am",
    "1link.in",
    "1tk.us",
    "1un.fr",
    "1url.com",
    "1url.cz",
    "1wb2.net",
    "2.gp",
    "2.ht",
    "23o.net",
    "2ad.in",
    "2big.at",
    "2doc.net",
    "2fear.com",
    "2pl.us",
    "2tu.us",
    "2ty.in",
    "2u.xf.cz",
    "2ya.com",
    "3ra.be",
    "3x.si",
    "4i.ae",
    "4url.cc",
    "4view.me",
    "5em.cz",
    "5url.net",
    "5z8.info",
    "6fr.ru",
    "6g6.eu",
    "6url.com",
    "7.ly",
    "76.gd",
    "77.ai",
    "7fth.cc",
    "7li.in",
    "7vd.cn",
    "8u.cz",
    "944.la",
    "98.to",
    "AltURL.com",
    "BudURL.com",
    "Buff.ly",
    "BurnURL.com",
    "C-O.IN",
    "ClickMeter.com",
    "DecentURL.com",
    "DigBig.com",
    "Digg.com",
    "DwarfURL.com",
    "EasyURI.com",
    "EasyURL.net",
    "EsyURL.com",
    "Fhurl.com",
    "Fly2.ws",
    "GoWat.ch",
    "Hurl.it",
    "IsCool.net",
    "Just.as",
    "L9.fr",
    "Lvvk.com",
    "MyURL.in",
    "PiURL.com",
    "Profile.to",
    "QLNK.net",
    "Quip-Art.com",
    "RedirX.com",
    "Sharein.com",
    "ShortLinks.co.uk",
    "Shrinkify.com",
    "SimURL.com",
    "StartURL.com",
    "TightURL.com",
    "Tnij.org",
    "To8.cc",
    "TraceURL.com",
    "URL.ie",
    "URLHawk.com",
    "WapURL.co.uk",
    "XeeURL.com",
    "Yep.it",
    "a.co",
    "a.gg",
    "a.nf",
    "a0.fr",
    "a2a.me",
    "abbr.sk",
    "abbrr.com",
    "ad-med.cz",
    "ad5.eu",
    "ad7.biz",
    "adb.ug",
    "adf.ly",
    "adfa.st",
    "adfly.fr",
    "adfoc.us",
    "adjix.com",
    "adli.pw",
    "admy.link",
    "adv.li",
    "ajn.me",
    "aka.gr",
    "al.ly",
    "alil.in",
    "any.gs",
    "aqva.pl",
    "ares.tl",
    "asso.in",
    "atu.ca",
    "au.ms",
    "ayt.fr",
    "azali.fr",
    "b00.fr",
    "b23.ru",
    "b54.in",
    "bacn.me",
    "baid.us",
    "bc.vc",
    "bee4.biz",
    "bim.im",
    "bit.do",
    "bit.ly",
    "bitly.com",
    "bitw.in",
    "bkite.com",
    "blap.net",
    "ble.pl",
    "blip.tv",
    "bloat.me",
    "boi.re",
    "bote.me",
    "bougn.at",
    "br4.in",
    "brk.to",
    "brzu.net",
    "budurl.com",
    "buk.me",
    "bul.lu",
    "bxl.me",
    "bzh.me",
    "cachor.ro",
    "captur.in",
    "catchylink.com",
    "cbs.so",
    "cbug.cc",
    "cc.cc",
    "ccj.im",
    "cf.ly",
    "cf2.me",
    "cf6.co",
    "chilp.it",
    "cjb.net",
    "clck.ru",
    "cli.gs",
    "clikk.in",
    "cn86.org",
    "coinurl.com",
    "cort.as",
    "couic.fr",
    "cr.tl",
    "cudder.it",
    "cur.lv",
    "curl.im",
    "cut.pe",
    "cut.sk",
    "cutt.eu",
    "cutt.us",
    "cutu.me",
    "cuturl.com",
    "cybr.fr",
    "cyonix.to",
    "d75.eu",
    "daa.pl",
    "dai.ly",
    "dd.ma",
    "ddp.net",
    "decenturl.com",
    "dfl8.me",
    "dft.ba",
    "doiop.com",
    "dolp.cc",
    "dopice.sk",
    "droid.ws",
    "dv.gd",
    "dy.fi",
    "dyo.gs",
    "e37.eu",
    "ecra.se",
    "eepurl.com",
    "ely.re",
    "erax.cz",
    "erw.cz",
    "ewerl.com",
    "ex9.co",
    "ezurl.cc",
    "fa.b",
    "ff.im",
    "fff.re",
    "fff.to",
    "fff.wf",
    "filz.fr",
    "fire.to",
    "firsturl.de",
    "flic.kr",
    "fly2.ws",
    "fnk.es",
    "foe.hn",
    "folu.me",
    "fon.gs",
    "freze.it",
    "fur.ly",
    "fwd4.me",
    "g00.me",
    "gg.gg",
    "git.io",
    "gl.am",
    "go.9nl.com",
    "go2.me",
    "go2cut.com",
    "goo.gl",
    "goo.lu",
    "good.ly",
    "goshrink.com",
    "grem.io",
    "gri.ms",
    "guiama.is",
    "gurl.es",
    "hadej.co",
    "hec.su",
    "hellotxt.com",
    "hex.io",
    "hide.my",
    "hjkl.fr",
    "hops.me",
    "hover.com",
    "href.in",
    "href.li",
    "ht.ly",
    "htxt.it",
    "hugeurl.com",
    "hurl.me",
    "hurl.ws",
    "i-2.co",
    "i99.cz",
    "icanhaz.com",
    "icit.fr",
    "ick.li",
    "icks.ro",
    "idek.net",
    "iiiii.in",
    "iky.fr",
    "ilix.in",
    "info.ms",
    "inreply.to",
    "is.gd",
    "isra.li",
    "iterasi.net",
    "itm.im",
    "ity.im",
    "ix.sk",
    "j.gs",
    "j.mp",
    "jdem.cz",
    "jieb.be",
    "jijr.com",
    "jmp2.net",
    "jp22.net",
    "jqw.de",
    "kask.us",
    "kd2.org",
    "kfd.pl",
    "kissa.be",
    "kl.am",
    "klck.me",
    "korta.nu",
    "kr3w.de",
    "krat.si",
    "kratsi.cz",
    "krod.cz",
    "krunchd.com",
    "kuc.cz",
    "kxb.me",
    "l-k.be",
    "l.gg",
    "lc-s.co",
    "lc.cx",
    "lcut.in",
    "letop10.",
    "libero.it",
    "lick.my",
    "lien.li",
    "lien.pl",
    "liip.to",
    "liltext.com",
    "lin.cr",
    "lin.io",
    "linkbee.com",
    "linkbun.ch",
    "linkn.co",
    "liurl.cn",
    "llu.ch",
    "ln-s.net",
    "ln-s.ru",
    "lnk.co",
    "lnk.gd",
    "lnk.in",
    "lnk.ly",
    "lnk.sk",
    "lnked.in",
    "lnks.fr",
    "lnky.fr",
    "lnp.sn",
    "loopt.us",
    "lp25.fr",
    "lru.jp",
    "lt.tl",
    "lurl.no",
    "lynk.my",
    "m1p.fr",
    "m3mi.com",
    "make.my",
    "mcaf.ee",
    "mdl29.net",
    "metamark.net",
    "mic.fr",
    "migre.me",
    "minilien.com",
    "miniurl.com",
    "minu.me",
    "minurl.fr",
    "moourl.com",
    "more.sh",
    "mut.lu",
    "myurl.in",
    "ne1.net",
    "net.ms",
    "net46.net",
    "nicou.ch",
    "nig.gr",
    "njx.me",
    "nn.nf",
    "notlong.com",
    "nov.io",
    "nq.st",
    "nsfw.in",
    "nxy.in",
    "o-x.fr",
    "okok.fr",
    "om.ly",
    "ou.af",
    "ou.gd",
    "oua.be",
    "ouo.io",
    "ow.ly",
    "p.pw",
    "para.pt",
    "parky.tv",
    "past.is",
    "pd.am",
    "pdh.co",
    "ph.dog",
    "ph.ly",
    "pic.gd",
    "pich.in",
    "pin.st",
    "ping.fm",
    "plots.fr",
    "pm.wu.cz",
    "pnt.me",
    "po.st",
    "poprl.com",
    "post.ly",
    "posted.at",
    "ppfr.it",
    "ppst.me",
    "ppt.cc",
    "ppt.li",
    "prejit.cz",
    "ptab.it",
    "ptm.ro",
    "pw2.ro",
    "py6.ru",
    "q.gs",
    "qbn.ru",
    "qicute.com",
    "qqc.co",
    "qr.net",
    "qrtag.fr",
    "qxp.cz",
    "qxp.sk",
    "rb6.co",
    "rb6.me",
    "rcknr.io",
    "rdz.me",
    "redir.ec",
    "redir.fr",
    "redu.it",
    "ref.so",
    "reise.lc",
    "relink.fr",
    "ri.ms",
    "rickroll.it",
    "riz.cz",
    "riz.gd",
    "rod.gs",
    "roflc.at",
    "rsmonkey.com",
    "rt.se",
    "rt.tc",
    "ru.ly",
    "rubyurl.com",
    "s-url.fr",
    "s.id",
    "s7y.us",
    "safe.mn",
    "sagyap.tk",
    "sdu.sk",
    "seeme.at",
    "segue.se",
    "sh.st",
    "shar.as",
    "sharetabs.com",
    "shorl.com",
    "short.cc",
    "short.ie",
    "short.nr",
    "short.pk",
    "short.to",
    "shorte.st",
    "shortna.me",
    "shorturl.com",
    "shoturl.us",
    "shrinkee.com",
    "shrinkster.com",
    "shrinkurl.in",
    "shrt.in",
    "shrt.st",
    "shrten.com",
    "shrunkin.com",
    "shw.me",
    "shy.si",
    "sicax.net",
    "sina.lt",
    "sk.gy",
    "skr.sk",
    "skroc.pl",
    "smll.co",
    "sn.im",
    "sn.vc",
    "snipr.com",
    "snipurl.com",
    "snsw.us",
    "snurl.com",
    "soo.gd",
    "sp2.ro",
    "spedr.com",
    "spn.sr",
    "sptfy.com",
    "sq6.ru",
    "sqrl.it",
    "ssl.gs",
    "sturly.com",
    "su.pr",
    "surl.me",
    "sux.cz",
    "sy.pe",
    "t.cn",
    "t.co",
    "ta.gd",
    "tabzi.com",
    "tau.pe",
    "tcrn.ch",
    "tdjt.cz",
    "thesa.us",
    "thinfi.com",
    "thrdl.es",
    "tin.li",
    "tini.cc",
    "tiny.cc",
    "tiny.lt",
    "tiny.ms",
    "tiny.pl",
    "tiny123.com",
    "tinyarro.ws",
    "tinytw.it",
    "tinyuri.ca",
    "tinyurl.com",
    "tinyurl.hu",
    "tinyvid.io",
    "tixsu.com",
    "tldr.sk",
    "tldrify.com",
    "tllg.net",
    "tnij.org",
    "tny.cz",
    "tny.im",
    "to.ly",
    "togoto.us",
    "tohle.de",
    "tpmr.com",
    "tr.im",
    "tr.my",
    "tr5.in",
    "trck.me",
    "trick.ly",
    "trkr.ws",
    "trunc.it",
    "turo.us",
    "tweetburner.com",
    "twet.fr",
    "twi.im",
    "twirl.at",
    "twit.ac",
    "twitterpan.com",
    "twitthis.com",
    "twiturl.de",
    "twlr.me",
    "twurl.cc",
    "twurl.nl",
    "u.mavrev.com",
    "u.nu",
    "u.to",
    "u6e.de",
    "ub0.cc",
    "uby.es",
    "ucam.me",
    "ug.cz",
    "ulmt.in",
    "unlc.us",
    "updating.me",
    "upzat.com",
    "ur1.ca",
    "url.co.uk",
    "url2.fr",
    "url4.eu",
    "url5.org",
    "urlao.com",
    "urlbrief.com",
    "urlcover.com",
    "urlcut.com",
    "urlenco.de",
    "urlin.it",
    "urlkiss.com",
    "urlkr.com",
    "urlot.com",
    "urlpire.com",
    "urls.fr",
    "urlx.ie",
    "urlx.org",
    "urlz.fr",
    "urlzen.com",
    "urub.us",
    "utfg.sk",
    "v.gd",
    "v.ht",
    "v5.gd",
    "vaaa.fr",
    "valv.im",
    "vaza.me",
    "vbly.us",
    "vd55.com",
    "verd.in",
    "vgn.me",
    "virl.com",
    "vl.am",
    "vov.li",
    "vsll.eu",
    "vt802.us",
    "vur.me",
    "vv.vg",
    "w1p.fr",
    "w3t.org",
    "waa.ai",
    "wb1.eu",
    "web99.eu",
    "wed.li",
    "wideo.fr",
    "wipi.es",
    "wp.me",
    "wtc.la",
    "wu.cz",
    "ww7.fr",
    "wwy.me",
    "x.co",
    "x.nu",
    "x.se",
    "x10.mx",
    "x2c.eu",
    "x2c.eumx",
    "xaddr.com",
    "xav.cc",
    "xgd.in",
    "xib.me",
    "xl8.eu",
    "xoe.cz",
    "xr.com",
    "xrl.in",
    "xrl.us",
    "xt3.me",
    "xua.me",
    "xub.me",
    "xurl.jp",
    "xurls.co",
    "xzb.cc",
    "y2u.be",
    "yagoa.fr",
    "yagoa.me",
    "yau.sh",
    "yeca.eu",
    "yect.com",
    "yep.it",
    "yfrog.com",
    "yogh.me",
    "yon.ir",
    "youfap.me",
    "ysear.ch",
    "yweb.com",
    "yyv.co",
    "z9.fr",
    "zSMS.net",
    "zapit.nu",
    "zeek.ir",
    "zi.ma",
    "zi.pe",
    "zip.net",
    "zipmyurl.com",
    "zkr.cz",
    "zkrat.me",
    "zkrt.cz",
    "zoodl.com",
    "zpag.es",
    "zti.me",
    "zxq.net",
    "zyva.org",
    "zz.gd",
    "zzb.bz",
  ];

  public apply(value: string): string {
    if (value) {
      value = this.removeSpam(value);
      value = this.removeBadWords(value);
    }
    return value;
  }

  private removeBadWords(value: string): string {
    const badwords = new BadWords();
    badwords.addWords("pedo", "pedophile");
    return badwords.clean(value);
  }

  private removeSpam(value: string): string {
    const censorify = new Censorify();
    const exceptions = [
      (match) => match.url === "http://dpos.arky-delegate.info",
      (match) => match.url === "http://arky-delegate.info",
      (match) => match.url === "https://arkfun.io/",
      (match) => match.url === "https://ark.io/",
    ];
    censorify.set({ exceptions });
    return censorify.process(value);
  }
}
