import { React } from "react";
import "./App.css";
function App() {
  function appendDealMakerWidget() {
    if (!document.getElementById("dealmakerwidget")) {
      const head = document.getElementById("wrapper");
      const script = document.createElement("iframe");
      script.setAttribute("src", "dealmaker.html");
      script.setAttribute("id", "dealmakerwidget");
      script.setAttribute(
        "style",
        "width:100%; height:700px; border:none;display:block;"
      );
      head.insertBefore(script, head.children[2]);
    }
  }
  window.addEventListener("load", () => {
    // appendInvestNowButton();
    setInterval(() => {
      appendDealMakerWidget();
    }, 1000);
  });

  return (
    <div>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
      />
      <meta name="theme-color" content="#ffffff" />
      <meta name="description" content="Fursa" />
      <title>Fursa</title>
      <noscript>
        &lt;iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MZLJ2CQ"
        height=0 width=0 style=display:none;visibility:hidden&gt;&lt;/iframe&gt;
      </noscript>
      <link href="/css/chunk-00581687.d877b800.css" rel="prefetch" />
      <link href="/css/chunk-0a33b5ae.18d3d882.css" rel="prefetch" />
      <link href="/css/chunk-0f1925bb.d2f0d0c2.css" rel="prefetch" />
      <link href="/css/chunk-16341181.fdd0f787.css" rel="prefetch" />
      <link href="/css/chunk-16b0c28c.bf6a0a22.css" rel="prefetch" />
      <link href="/css/chunk-18866714.acef9e2c.css" rel="prefetch" />
      <link href="/css/chunk-1a398ec4.a1afd802.css" rel="prefetch" />
      <link href="/css/chunk-1c0d3b7d.7e29b7e4.css" rel="prefetch" />
      <link href="/css/chunk-1e1c4b99.d7824816.css" rel="prefetch" />
      <link href="/css/chunk-1f107de6.bdb7edf0.css" rel="prefetch" />
      <link href="/css/chunk-1f41e2b2.e5192732.css" rel="prefetch" />
      <link href="/css/chunk-203f6079.f21b2601.css" rel="prefetch" />
      <link href="/css/chunk-21ba979e.090e8976.css" rel="prefetch" />
      <link href="/css/chunk-243dc43f.e00ffce5.css" rel="prefetch" />
      <link href="/css/chunk-2a3db0b4.077c8428.css" rel="prefetch" />
      <link href="/css/chunk-2de90760.8b525600.css" rel="prefetch" />
      <link href="/css/chunk-2f90e346.1f685918.css" rel="prefetch" />
      <link href="/css/chunk-309744ec.9c812782.css" rel="prefetch" />
      <link href="/css/chunk-3706efb6.8f9fba99.css" rel="prefetch" />
      <link href="/css/chunk-3a8fa4e2.ad29de18.css" rel="prefetch" />
      <link href="/css/chunk-437e8d29.edc338c4.css" rel="prefetch" />
      <link href="/css/chunk-43ba332a.66b71bdd.css" rel="prefetch" />
      <link href="/css/chunk-460a2ad8.9a3dbc5e.css" rel="prefetch" />
      <link href="/css/chunk-49def3ca.13c1074a.css" rel="prefetch" />
      <link href="/css/chunk-5769c2a1.665da58c.css" rel="prefetch" />
      <link href="/css/chunk-600ed126.85fbf7b6.css" rel="prefetch" />
      <link href="/css/chunk-690e71b4.f03fc2a3.css" rel="prefetch" />
      <link href="/css/chunk-70584100.05135600.css" rel="prefetch" />
      <link href="/css/chunk-9b4d7734.7982a2af.css" rel="prefetch" />
      <link href="/css/chunk-a380ab8e.4075fdcf.css" rel="prefetch" />
      <link href="/css/chunk-a73b41fa.93579793.css" rel="prefetch" />
      <link href="/css/chunk-aea0f9f4.c50c185c.css" rel="prefetch" />
      <link href="/css/chunk-bad2de48.7158ca55.css" rel="prefetch" />
      <link href="/css/chunk-d30e5e2e.f60dba5d.css" rel="prefetch" />
      <link href="/css/chunk-d5b89ea0.17238c6a.css" rel="prefetch" />
      <link href="/css/chunk-fbb96e98.5701bc68.css" rel="prefetch" />
      <link href="/js/chunk-00581687.c0e6f84d.js" rel="prefetch" />
      <link href="/js/chunk-05af002f.d62000b4.js" rel="prefetch" />
      <link href="/js/chunk-07865eec.2ab863e8.js" rel="prefetch" />
      <link href="/js/chunk-0a33b5ae.93f86db7.js" rel="prefetch" />
      <link href="/js/chunk-0f1925bb.f411e459.js" rel="prefetch" />
      <link href="/js/chunk-16341181.2e2d779d.js" rel="prefetch" />
      <link href="/js/chunk-16b0c28c.cc554704.js" rel="prefetch" />
      <link href="/js/chunk-18866714.7861590a.js" rel="prefetch" />
      <link href="/js/chunk-1a398ec4.08c8620b.js" rel="prefetch" />
      <link href="/js/chunk-1c0d3b7d.f25919f3.js" rel="prefetch" />
      <link href="/js/chunk-1e1c4b99.8f3bd52b.js" rel="prefetch" />
      <link href="/js/chunk-1f107de6.fd8ecac8.js" rel="prefetch" />
      <link href="/js/chunk-1f41e2b2.e5766779.js" rel="prefetch" />
      <link href="/js/chunk-203f6079.a32e2e95.js" rel="prefetch" />
      <link href="/js/chunk-21ba979e.557db3ce.js" rel="prefetch" />
      <link href="/js/chunk-223611db.222f312c.js" rel="prefetch" />
      <link href="/js/chunk-243dc43f.69d43aad.js" rel="prefetch" />
      <link href="/js/chunk-2a3db0b4.d9b8d590.js" rel="prefetch" />
      <link href="/js/chunk-2d0a38f5.2118c211.js" rel="prefetch" />
      <link href="/js/chunk-2d0a4610.57d8479b.js" rel="prefetch" />
      <link href="/js/chunk-2d0aeb4a.7b80ee4f.js" rel="prefetch" />
      <link href="/js/chunk-2d0afa2c.72eb9785.js" rel="prefetch" />
      <link href="/js/chunk-2d0b1db5.b5ec7f86.js" rel="prefetch" />
      <link href="/js/chunk-2d0b39eb.884af0b1.js" rel="prefetch" />
      <link href="/js/chunk-2d0ba14b.4082ae8d.js" rel="prefetch" />
      <link href="/js/chunk-2d0c8d6d.0865291d.js" rel="prefetch" />
      <link href="/js/chunk-2d0ceed3.ac35434b.js" rel="prefetch" />
      <link href="/js/chunk-2d0cf38f.96107cd1.js" rel="prefetch" />
      <link href="/js/chunk-2d0d0b2d.f14d64bb.js" rel="prefetch" />
      <link href="/js/chunk-2d0d5fc0.f4a5bf02.js" rel="prefetch" />
      <link href="/js/chunk-2d0d8026.d133c468.js" rel="prefetch" />
      <link href="/js/chunk-2d0db469.9572e50d.js" rel="prefetch" />
      <link href="/js/chunk-2d0de1ee.090f960c.js" rel="prefetch" />
      <link href="/js/chunk-2d0df1fe.e85b6ac0.js" rel="prefetch" />
      <link href="/js/chunk-2d0e9aeb.aea94279.js" rel="prefetch" />
      <link href="/js/chunk-2d118a64.94dbb8a0.js" rel="prefetch" />
      <link href="/js/chunk-2d20efff.93b8dbb8.js" rel="prefetch" />
      <link href="/js/chunk-2d20fe7c.e891c7f9.js" rel="prefetch" />
      <link href="/js/chunk-2d20fee6.1205a30a.js" rel="prefetch" />
      <link href="/js/chunk-2d2105ac.91e587d2.js" rel="prefetch" />
      <link href="/js/chunk-2d21662f.b6cd5021.js" rel="prefetch" />
      <link href="/js/chunk-2d2174fb.385499fe.js" rel="prefetch" />
      <link href="/js/chunk-2d21b4fa.da8da217.js" rel="prefetch" />
      <link href="/js/chunk-2d2214f1.59a95fed.js" rel="prefetch" />
      <link href="/js/chunk-2d225786.a35c2e90.js" rel="prefetch" />
      <link href="/js/chunk-2d228d3c.5dcf533e.js" rel="prefetch" />
      <link href="/js/chunk-2d229758.a7cd23eb.js" rel="prefetch" />
      <link href="/js/chunk-2d22db26.6f9794ae.js" rel="prefetch" />
      <link href="/js/chunk-2de90760.e9e904e3.js" rel="prefetch" />
      <link href="/js/chunk-2f90e346.3dcfacb8.js" rel="prefetch" />
      <link href="/js/chunk-309744ec.15545477.js" rel="prefetch" />
      <link href="/js/chunk-3706efb6.a9026ed0.js" rel="prefetch" />
      <link href="/js/chunk-3a8fa4e2.fd28b71c.js" rel="prefetch" />
      <link href="/js/chunk-43101d55.27c9a136.js" rel="prefetch" />
      <link href="/js/chunk-437e8d29.4954c19e.js" rel="prefetch" />
      <link href="/js/chunk-43ba332a.7d31dd2e.js" rel="prefetch" />
      <link href="/js/chunk-460a2ad8.d7563a6c.js" rel="prefetch" />
      <link href="/js/chunk-47de0aa0.0d93f8bf.js" rel="prefetch" />
      <link href="/js/chunk-49def3ca.d56c4704.js" rel="prefetch" />
      <link href="/js/chunk-5769c2a1.f3e76b0d.js" rel="prefetch" />
      <link href="/js/chunk-600ed126.55e55d1b.js" rel="prefetch" />
      <link href="/js/chunk-6511e246.ac6d5aef.js" rel="prefetch" />
      <link href="/js/chunk-655f23ea.29e4d33a.js" rel="prefetch" />
      <link href="/js/chunk-66385790.3354359e.js" rel="prefetch" />
      <link href="/js/chunk-663b6706.e889e5de.js" rel="prefetch" />
      <link href="/js/chunk-66623478.d8bbeb6f.js" rel="prefetch" />
      <link href="/js/chunk-666796e0.82dcde51.js" rel="prefetch" />
      <link href="/js/chunk-690e71b4.9f00decd.js" rel="prefetch" />
      <link href="/js/chunk-70584100.9d8b86a4.js" rel="prefetch" />
      <link href="/js/chunk-77caced0.60132ca6.js" rel="prefetch" />
      <link href="/js/chunk-80805ce4.e5910be1.js" rel="prefetch" />
      <link href="/js/chunk-90e3609a.bebf1429.js" rel="prefetch" />
      <link href="/js/chunk-9b4d7734.a76184ef.js" rel="prefetch" />
      <link href="/js/chunk-a380ab8e.6dee8b13.js" rel="prefetch" />
      <link href="/js/chunk-a73b41fa.0229a3e6.js" rel="prefetch" />
      <link href="/js/chunk-aea0f9f4.e153b062.js" rel="prefetch" />
      <link href="/js/chunk-bad2de48.83a043b7.js" rel="prefetch" />
      <link href="/js/chunk-d30e5e2e.75ec6517.js" rel="prefetch" />
      <link href="/js/chunk-d5b89ea0.25879a44.js" rel="prefetch" />
      <link href="/js/chunk-ea76bc7e.29816e6e.js" rel="prefetch" />
      <link href="/js/chunk-fbb96e98.2bac4193.js" rel="prefetch" />
      <link href="/js/faq.9e762f14.js" rel="prefetch" />
      <link href="/js/howBorrow.75ea1597.js" rel="prefetch" />
      <link href="/js/howIfisa.3ee6e073.js" rel="prefetch" />
      <link href="/css/app.c7b49f3f.css" rel="preload" as="style" />
      <link href="/css/chunk-vendors.3d2dda29.css" rel="preload" as="style" />
      <link href="/js/app.ddc8194d.js" rel="preload" as="script" />
      <link href="/js/chunk-vendors.86f1fad4.js" rel="preload" as="script" />
      <link href="/css/chunk-vendors.3d2dda29.css" rel="stylesheet" />
      <link href="/css/app.c7b49f3f.css" rel="stylesheet" />
      <div id="app"></div>
      {/* <div>
        <div>
          <div style={{ margin: "1rem" }} id="#dealmaker">
            <iframe
              src="dealmaker.html"
              style={{ width: "100%", height: "700px", border: "none" }}
            ></iframe>
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default App;
