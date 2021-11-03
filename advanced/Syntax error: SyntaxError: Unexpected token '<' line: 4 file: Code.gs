<!DOCTYPE html>
<!-- saved from url=(0081)https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0 -->
<html lang="en" dir="ltr"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><style>body {transition: opacity ease-in 0.2s; } 
body[unresolved] {opacity: 0; display: block; overflow: hidden; position: relative; } 
</style>
    <meta name="google-signin-client-id" content="721724668570-nbkv1cfusk7kk4eni4pjvepaus73b13t.apps.googleusercontent.com">
    <meta name="google-signin-scope" content="profile email https://www.googleapis.com/auth/developerprofiles https://www.googleapis.com/auth/developerprofiles.award">
    <meta property="og:site_name" content="Google Developers">
    <meta property="og:type" content="website"><meta name="theme-color" content="#ffffff">
    <meta content="IE=Edge" http-equiv="X-UA-Compatible">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="manifest" href="https://developers.google.com/_pwa/developers/manifest.json" crossorigin="use-credentials">
    <link rel="preconnect" href="https://www.gstatic.com/" crossorigin="">
    <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin="">
    <link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin="">
    <link rel="preconnect" href="https://apis.google.com/" crossorigin="">
    <link rel="preconnect" href="https://www.google-analytics.com/" crossorigin=""><link rel="stylesheet" href="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/css">
      <link rel="stylesheet" href="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/css(1)"><link rel="stylesheet" href="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/app.css">
      <link rel="shortcut icon" href="https://www.gstatic.com/devrel-devsite/prod/v0a713fec70a4b4c54311265d5142e962747a0e45a24063467564a2765c008ac7/developers/images/favicon.png">
    <link rel="apple-touch-icon" href="https://www.gstatic.com/devrel-devsite/prod/v0a713fec70a4b4c54311265d5142e962747a0e45a24063467564a2765c008ac7/developers/images/touchicon-180.png"><link rel="canonical" href="https://developers.google.com/apps-script/advanced/admin-sdk-directory"><link rel="search" type="application/opensearchdescription+xml" title="Google Developers" href="https://developers.google.com/s/opensearch.xml?authuser=0">
      

<title>Admin SDK Directory Service &nbsp;|&nbsp; Apps Script &nbsp;|&nbsp; Google Developers</title>

<meta property="og:title" content="Admin SDK Directory Service  |  Apps Script  |  Google Developers"><meta property="og:url" content="https://developers.google.com/apps-script/advanced/admin-sdk-directory"><meta property="og:image" content="https://www.gstatic.com/devrel-devsite/prod/v0a713fec70a4b4c54311265d5142e962747a0e45a24063467564a2765c008ac7/developers/images/opengraph/white.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="675"><meta property="og:locale" content="en"><meta name="twitter:card" content="summary_large_image"><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/cb=gapi.loaded_1" nonce="" async=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/cb=gapi.loaded_0" nonce="" async=""></script><script type="text/javascript" async="" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/linkid.js" nonce=""></script><script async="" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/app_loader.js"></script><script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Apps Script",
      "item": "https://developers.google.com/apps-script"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Admin SDK Directory Service",
      "item": "https://developers.google.com/apps-script/advanced/admin-sdk-directory"
    }]
  }
  </script>
  <meta name="xsrf_token" content="gLbNzls4PoH_TctQKLiYzgXvy-_n3d8QSrs0GbTNh6k6MTYzNTkxNzkxODAxMjQ5MA">
  

  <meta name="session_expiry" content="0">
  

  

  


    <style type="text/css"></style><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/webcomponents-lite.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_app_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_a11y_announce_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_analytics_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_badger_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_book_nav_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_bookmark_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_code_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_content_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_panel_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_expandable_nav_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_feedback_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_footer_linkboxes_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_footer_promos_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_footer_utility_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_header_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_heading_link_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_language_selector_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_progress_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_recommendations_sidebar_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_search_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_select_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_sitemask_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_snackbar_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_tabs_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_thumb_rating_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_toc_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_tooltip_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_user_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/analytics.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_badge_awarded_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_dialog_module.js" nonce=""></script><script src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/devsite_devsite_spinner_module.js" nonce=""></script><style type="text/css">.gb_Va:not(.gb_Bd){font:13px/27px Roboto,RobotoDraft,Arial,sans-serif;z-index:986}@keyframes gb__a{0%{opacity:0}50%{opacity:1}}a.gb_Z{border:none;color:#4285f4;cursor:default;font-weight:bold;outline:none;position:relative;text-align:center;text-decoration:none;text-transform:uppercase;white-space:nowrap}a.gb_Z:hover:after,a.gb_Z:focus:after{background-color:rgba(0,0,0,.12);content:'';height:100%;left:0;position:absolute;top:0;width:100%}a.gb_Z:hover,a.gb_Z:focus{text-decoration:none}a.gb_Z:active{background-color:rgba(153,153,153,.4);text-decoration:none}a.gb_0{background-color:#4285f4;color:#fff}a.gb_0:active{background-color:#0043b2}.gb_1{box-shadow:0 1px 1px rgba(0,0,0,.16)}.gb_Z,.gb_0,.gb_2,.gb_3{display:inline-block;line-height:28px;padding:0 12px;border-radius:2px}.gb_2{background:#f8f8f8;border:1px solid #c6c6c6}.gb_3{background:#f8f8f8}.gb_2,#gb a.gb_2.gb_2,.gb_3{color:#666;cursor:default;text-decoration:none}#gb a.gb_3.gb_3{cursor:default;text-decoration:none}.gb_3{border:1px solid #4285f4;font-weight:bold;outline:none;background:#4285f4;background:linear-gradient(top,#4387fd,#4683ea);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#4387fd,endColorstr=#4683ea,GradientType=0)}#gb a.gb_3.gb_3{color:#fff}.gb_3:hover{box-shadow:0 1px 0 rgba(0,0,0,.15)}.gb_3:active{box-shadow:inset 0 2px 0 rgba(0,0,0,.15);background:#3c78dc;background:linear-gradient(top,#3c7ae4,#3f76d3);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#3c7ae4,endColorstr=#3f76d3,GradientType=0)}.gb_Aa{display:none!important}.gb_Ba{visibility:hidden}.gb_bd{display:inline-block;vertical-align:middle}.gb_tf{position:relative}.gb_C{display:inline-block;outline:none;vertical-align:middle;border-radius:2px;box-sizing:border-box;height:40px;width:40px;color:#000;cursor:pointer;text-decoration:none}#gb#gb a.gb_C{color:#000;cursor:pointer;text-decoration:none}.gb_Xa{border-color:transparent;border-bottom-color:#fff;border-style:dashed dashed solid;border-width:0 8.5px 8.5px;display:none;position:absolute;left:11.5px;top:43px;z-index:1;height:0;width:0;animation:gb__a .2s}.gb_Za{border-color:transparent;border-style:dashed dashed solid;border-width:0 8.5px 8.5px;display:none;position:absolute;left:11.5px;z-index:1;height:0;width:0;animation:gb__a .2s;border-bottom-color:#ccc;border-bottom-color:rgba(0,0,0,.2);top:42px}x:-o-prefocus,div.gb_Za{border-bottom-color:#ccc}.gb_E{background:#fff;border:1px solid #ccc;border-color:rgba(0,0,0,.2);color:#000;box-shadow:0 2px 10px rgba(0,0,0,.2);display:none;outline:none;overflow:hidden;position:absolute;right:8px;top:62px;animation:gb__a .2s;border-radius:2px}.gb_bd.gb_la .gb_Xa,.gb_bd.gb_la .gb_Za,.gb_bd.gb_la .gb_E,.gb_la.gb_E{display:block}.gb_bd.gb_la.gb_uf .gb_Xa,.gb_bd.gb_la.gb_uf .gb_Za{display:none}.gb_vf{position:absolute;right:8px;top:62px;z-index:-1}.gb_Ja .gb_Xa,.gb_Ja .gb_Za,.gb_Ja .gb_E{margin-top:-10px}.gb_bd:first-child,#gbsfw:first-child+.gb_bd{padding-left:4px}.gb_pa.gb_Le .gb_bd:first-child{padding-left:0}.gb_Me{position:relative}.gb_Mc .gb_Me,.gb_Sd .gb_Me{float:right}.gb_C{padding:8px;cursor:pointer}.gb_pa .gb_3c:not(.gb_Z):focus img{background-color:rgba(0,0,0,0.20);outline:none;border-radius:50%}.gb_Ne button:focus svg,.gb_Ne button:hover svg,.gb_Ne button:active svg,.gb_C:focus,.gb_C:hover,.gb_C:active,.gb_C[aria-expanded=true]{outline:none;border-radius:50%}.gb_vc .gb_Ne.gb_Oe button:focus svg,.gb_vc .gb_Ne.gb_Oe button:focus:hover svg,.gb_Ne button:focus svg,.gb_Ne button:focus:hover svg,.gb_C:focus,.gb_C:focus:hover{background-color:rgba(60,64,67,0.1)}.gb_vc .gb_Ne.gb_Oe button:active svg,.gb_Ne button:active svg,.gb_C:active{background-color:rgba(60,64,67,0.12)}.gb_vc .gb_Ne.gb_Oe button:hover svg,.gb_Ne button:hover svg,.gb_C:hover{background-color:rgba(60,64,67,0.08)}.gb_ia .gb_C.gb_Ma:hover{background-color:transparent}.gb_C[aria-expanded=true],.gb_C:hover[aria-expanded=true]{background-color:rgba(95,99,104,0.24)}.gb_C[aria-expanded=true] .gb_Pe,.gb_C[aria-expanded=true] .gb_Qe{fill:#5f6368;opacity:1}.gb_vc .gb_Ne button:hover svg,.gb_vc .gb_C:hover{background-color:rgba(232,234,237,0.08)}.gb_vc .gb_Ne button:focus svg,.gb_vc .gb_Ne button:focus:hover svg,.gb_vc .gb_C:focus,.gb_vc .gb_C:focus:hover{background-color:rgba(232,234,237,0.10)}.gb_vc .gb_Ne button:active svg,.gb_vc .gb_C:active{background-color:rgba(232,234,237,0.12)}.gb_vc .gb_C[aria-expanded=true],.gb_vc .gb_C:hover[aria-expanded=true]{background-color:rgba(255,255,255,0.12)}.gb_vc .gb_C[aria-expanded=true] .gb_Pe,.gb_vc .gb_C[aria-expanded=true] .gb_Qe{fill:#ffffff;opacity:1}.gb_bd{padding:4px}.gb_pa.gb_Le .gb_bd{padding:4px 2px}.gb_pa.gb_Le .gb_Na.gb_bd{padding-left:6px}.gb_E{z-index:991;line-height:normal}.gb_E.gb_Re{left:8px;right:auto}@media (max-width:350px){.gb_E.gb_Re{left:0}}.gb_Se .gb_E{top:56px}.gb_B .gb_C,.gb_D .gb_B .gb_C{background-position:-64px -29px}.gb_i .gb_B .gb_C{background-position:-29px -29px;opacity:1}.gb_B .gb_C,.gb_B .gb_C:hover,.gb_B .gb_C:focus{opacity:1}.gb_Cd{display:none}.gb_Uc{font-family:Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;font-size:20px;font-weight:400;letter-spacing:0.25px;line-height:48px;margin-bottom:2px;opacity:1;overflow:hidden;padding-left:16px;position:relative;text-overflow:ellipsis;vertical-align:middle;top:2px;white-space:nowrap;flex:1 1 auto}.gb_Uc.gb_Vc{color:#3c4043}.gb_pa.gb_qa .gb_Uc{margin-bottom:0}.gb_Wc.gb_Xc .gb_Uc{padding-left:4px}.gb_pa.gb_qa .gb_Zc{position:relative;top:-2px}.gb_pa{color:black;min-width:320px;position:relative;transition:box-shadow 250ms}.gb_pa.gb_Dc{min-width:240px}.gb_pa.gb_Dd .gb_Ed{display:none}.gb_pa.gb_Dd .gb_Fd{height:56px}header.gb_pa{display:block}.gb_pa svg{fill:currentColor}.gb_Hd{position:fixed;top:0;width:100%}.gb_Id{box-shadow:0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12),0px 2px 4px -1px rgba(0,0,0,0.2)}.gb_Jd{height:64px}.gb_Fd{box-sizing:border-box;position:relative;width:100%;display:flex;justify-content:space-between;min-width:min-content}.gb_pa:not(.gb_qa) .gb_Fd{padding:8px}.gb_pa.gb_Kd .gb_Fd{flex:1 0 auto}.gb_pa .gb_Fd.gb_Ld.gb_Md{min-width:0}.gb_pa.gb_qa .gb_Fd{padding:4px;padding-left:8px;min-width:0}.gb_Ed{height:48px;vertical-align:middle;white-space:nowrap;align-items:center;display:flex}.gb_Od>.gb_Ed{display:table-cell;width:100%}.gb_Wc{padding-right:30px;box-sizing:border-box;flex:1 0 auto}.gb_pa.gb_qa .gb_Wc{padding-right:14px}.gb_Pd{flex:1 1 100%}.gb_Pd>:only-child{display:inline-block}.gb_Qd.gb_Nc{padding-left:4px}.gb_Qd.gb_Rd,.gb_pa.gb_Kd .gb_Qd,.gb_pa.gb_qa:not(.gb_Sd) .gb_Qd{padding-left:0}.gb_pa.gb_qa .gb_Qd.gb_Rd{padding-right:0}.gb_pa.gb_qa .gb_Qd.gb_Rd .gb_ia{margin-left:10px}.gb_Nc{display:inline}.gb_pa.gb_Hc .gb_Qd.gb_Td,.gb_pa.gb_Sd .gb_Qd.gb_Td{padding-left:2px}.gb_Uc{display:inline-block}.gb_Qd{box-sizing:border-box;height:48px;line-height:normal;padding:0 4px;padding-left:30px;flex:0 0 auto;justify-content:flex-end}.gb_Sd{height:48px}.gb_pa.gb_Sd{min-width:initial;min-width:auto}.gb_Sd .gb_Qd{float:right;padding-left:32px}.gb_Sd .gb_Qd.gb_Ud{padding-left:0}.gb_Vd{font-size:14px;max-width:200px;overflow:hidden;padding:0 12px;text-overflow:ellipsis;white-space:nowrap}.gb_Wd{transition:background-color .4s}.gb_Xd{color:black}.gb_vc{color:white}.gb_pa a,.gb_Ac a{color:inherit}.gb_s{color:rgba(0,0,0,0.87)}.gb_pa svg,.gb_Ac svg,.gb_Wc .gb_Zd,.gb_Mc .gb_Zd{color:#5f6368;opacity:1}.gb_vc svg,.gb_Ac.gb_Ec svg,.gb_vc .gb_Wc .gb_Zd,.gb_vc .gb_Wc .gb_uc,.gb_vc .gb_Wc .gb_Zc,.gb_Ac.gb_Ec .gb_Zd{color:rgba(255,255,255, 0.87 )}.gb_vc .gb_Wc .gb_tc:not(.gb_0d){opacity:0.87}.gb_Vc{color:inherit;opacity:1;text-rendering:optimizeLegibility}.gb_vc .gb_Vc,.gb_Xd .gb_Vc{opacity:1}.gb_1d{position:relative}.gb_2d{font-family:arial,sans-serif;line-height:normal;padding-right:15px}a.gb_f,span.gb_f{color:rgba(0,0,0,0.87);text-decoration:none}.gb_vc a.gb_f,.gb_vc span.gb_f{color:white}a.gb_f:focus{outline-offset:2px}a.gb_f:hover{text-decoration:underline}.gb_g{display:inline-block;padding-left:15px}.gb_g .gb_f{display:inline-block;line-height:24px;vertical-align:middle}.gb_3d{font-family:Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;font-weight:500;font-size:14px;letter-spacing:0.25px;line-height:16px;margin-left:10px;margin-right:8px;min-width:96px;padding:9px 23px;text-align:center;vertical-align:middle;border-radius:4px;box-sizing:border-box}.gb_pa.gb_Sd .gb_3d{margin-left:8px}#gb a.gb_3.gb_3.gb_3d,#gb a.gb_2.gb_2.gb_3d{cursor:pointer}.gb_3.gb_3d:hover{background:#2b7de9;box-shadow:0 1px 2px 0 rgba(66,133,244,0.3),0 1px 3px 1px rgba(66,133,244,0.15)}.gb_3.gb_3d:focus,.gb_3.gb_3d:hover:focus{background:#5094ed;box-shadow:0 1px 2px 0 rgba(66,133,244,0.3),0 1px 3px 1px rgba(66,133,244,0.15)}.gb_3.gb_3d:active{background:#63a0ef;box-shadow:0 1px 2px 0 rgba(66,133,244,0.3),0 1px 3px 1px rgba(66,133,244,0.15)}.gb_3d:not(.gb_2){background:#1a73e8;border:1px solid transparent}.gb_pa.gb_qa .gb_3d{padding:9px 15px;min-width:80px}.gb_4d{text-align:left}#gb a.gb_3d.gb_2,#gb .gb_vc a.gb_3d,#gb.gb_vc a.gb_3d{background:#ffffff;border-color:#dadce0;box-shadow:none;color:#1a73e8}#gb a.gb_3.gb_ja.gb_3d{background:#8ab4f8;border:1px solid transparent;box-shadow:none;color:#202124}#gb a.gb_3d.gb_2:hover,#gb .gb_vc a.gb_3d:hover,#gb.gb_vc a.gb_3d:hover{background:#f8fbff;border-color:#cce0fc}#gb a.gb_3.gb_ja.gb_3d:hover{background:#93baf9;border-color:transparent;box-shadow:0 1px 3px 1px rgba(0,0,0,0.15),0 1px 2px rgba(0,0,0,0.3)}#gb a.gb_3d.gb_2:focus,#gb a.gb_3d.gb_2:focus:hover,#gb .gb_vc a.gb_3d:focus,#gb .gb_vc a.gb_3d:focus:hover,#gb.gb_vc a.gb_3d:focus,#gb.gb_vc a.gb_3d:focus:hover{background:#f4f8ff;border-color:#c9ddfc}#gb a.gb_3.gb_ja.gb_3d:focus,#gb a.gb_3.gb_ja.gb_3d:focus:hover{background:#a6c6fa;border-color:transparent;box-shadow:none}#gb a.gb_3d.gb_2:active,#gb .gb_vc a.gb_3d:active,#gb.gb_vc a.gb_3d:active{background:#ecf3fe}#gb a.gb_3.gb_ja.gb_3d:active{background:#a1c3f9;box-shadow:0 1px 2px rgba(60,64,67,0.3),0 2px 6px 2px rgba(60,64,67,0.15)}#gb a.gb_3d.gb_2:not(.gb_ja):active{box-shadow:0 1px 2px 0 rgba(60,64,67,0.3),0 2px 6px 2px rgba(60,64,67,0.15)}.gb_ia{background-color:rgba(255,255,255,0.88);border:1px solid #dadce0;box-sizing:border-box;cursor:pointer;display:inline-block;max-height:48px;overflow:hidden;outline:none;padding:0;vertical-align:middle;width:134px;border-radius:8px}.gb_ia.gb_ja{background-color:transparent;border:1px solid #5f6368}.gb_ka{display:inherit}.gb_ia.gb_ja .gb_ka{background:#ffffff;border-radius:4px;display:inline-block;left:8px;margin-right:5px;position:relative;padding:3px;top:-1px}.gb_ia:hover{border:1px solid #d2e3fc;background-color:rgba(248,250,255,0.88)}.gb_ia.gb_ja:hover{border:1px solid #5f6368;background-color:rgba(232,234,237,0.08)}.gb_ia:focus{border:1px solid #fff;background-color:rgba(255,255,255);box-shadow:0px 1px 2px 0px rgba(60,64,67,0.3),0px 1px 3px 1px rgba(60,64,67,0.15)}.gb_ia.gb_ja:focus{border:1px solid #e8eaed;background-color:#38383b}.gb_ia.gb_ja:active,.gb_ia.gb_la.gb_ja:focus{border:1px solid #5f6368;background-color:#333438}.gb_ma{display:inline-block;padding-left:7px;padding-bottom:2px;text-align:center;vertical-align:middle;line-height:32px;width:78px}.gb_ia.gb_ja .gb_ma{line-height:26px;margin-left:0;width:72px;padding-left:0;padding-bottom:0}.gb_ma.gb_na{background-color:#f1f3f4;border-radius:4px;margin-left:8px;padding-left:0}.gb_ma.gb_na .gb_oa{vertical-align:middle}.gb_pa:not(.gb_qa) .gb_ia{margin-left:10px;margin-right:4px}.gb_ra{max-height:32px;width:78px}.gb_ia.gb_ja .gb_ra{max-height:26px;width:72px}.gb_Ca{background-size:32px 32px;border:0;border-radius:50%;display:block;margin:0px;position:relative;height:32px;width:32px;z-index:0}.gb_Da{background-color:#e8f0fe;border:1px solid rgba(32,33,36,.08);position:relative}.gb_Da.gb_Ca{height:30px;width:30px}.gb_Da.gb_Ca:hover,.gb_Da.gb_Ca:active{box-shadow:none}.gb_Ea{background:#fff;border:none;border-radius:50%;bottom:2px;box-shadow:0px 1px 2px 0px rgba(60,64,67,.30),0px 1px 3px 1px rgba(60,64,67,.15);height:14px;margin:2px;position:absolute;right:0;width:14px}.gb_Fa{color:#1f71e7;font:400 22px/32px Google Sans,Roboto,RobotoDraft,Helvetica,Arial,sans-serif;text-align:center;text-transform:uppercase}@media (min-resolution:1.25dppx),(-o-min-device-pixel-ratio:5/4),(-webkit-min-device-pixel-ratio:1.25),(min-device-pixel-ratio:1.25){.gb_Ca::before{display:inline-block;transform:scale(.5);transform-origin:left 0}.gb_Ha::before{display:inline-block;transform:scale(.5);transform-origin:left 0}.gb_k .gb_Ha::before{transform:scale(0.416666667)}}.gb_Ca:hover,.gb_Ca:focus{box-shadow:0 1px 0 rgba(0,0,0,.15)}.gb_Ca:active{box-shadow:inset 0 2px 0 rgba(0,0,0,.15)}.gb_Ca:active::after{background:rgba(0,0,0,.1);border-radius:50%;content:'';display:block;height:100%}.gb_Ia{cursor:pointer;line-height:40px;min-width:30px;opacity:.75;overflow:hidden;vertical-align:middle;text-overflow:ellipsis}.gb_C.gb_Ia{width:auto}.gb_Ia:hover,.gb_Ia:focus{opacity:.85}.gb_Ja .gb_Ia,.gb_Ja .gb_Ka{line-height:26px}#gb#gb.gb_Ja a.gb_Ia,.gb_Ja .gb_Ka{font-size:11px;height:auto}.gb_La{border-top:4px solid #000;border-left:4px dashed transparent;border-right:4px dashed transparent;display:inline-block;margin-left:6px;opacity:.75;vertical-align:middle}.gb_Ma:hover .gb_La{opacity:.85}.gb_ia>.gb_Na{padding:3px 3px 3px 4px}.gb_Oa.gb_Ba{color:#fff}.gb_i .gb_Ia,.gb_i .gb_La{opacity:1}#gb#gb.gb_i.gb_i a.gb_Ia,#gb#gb .gb_i.gb_i a.gb_Ia{color:#fff}.gb_i.gb_i .gb_La{border-top-color:#fff;opacity:1}.gb_D .gb_Ca:hover,.gb_i .gb_Ca:hover,.gb_D .gb_Ca:focus,.gb_i .gb_Ca:focus{box-shadow: 0 1px 0 rgba(0,0,0,.15) , 0 1px 2px rgba(0,0,0,.2) }.gb_Pa .gb_Na,.gb_Qa .gb_Na{position:absolute;right:1px}.gb_Na.gb_h,.gb_Ra.gb_h,.gb_Ma.gb_h{flex:0 1 auto;flex:0 1 main-size}.gb_Sa.gb_Ta .gb_Ia{width:30px!important}.gb_Ua{height:40px;position:absolute;right:-5px;top:-5px;width:40px}.gb_Va .gb_Ua,.gb_Wa .gb_Ua{right:0;top:0}.gb_Na .gb_C{padding:4px}.gb_6d{display:none}sentinel{}</style><script id="ogb-head-script">;this.gbar_={CONFIG:[[[0,"www.gstatic.com","og.qtm.en_US.75zE3OGOif4.O","com","en","331",0,[4,2,"","","","406728538","0"],null,"YCCCYcKbJ8yStAbUxZbACg",null,0,"og.qtm.shRVBKchaBo.L.X.O","AA2YrTtxj8WxYDU47Y0XcqogWaw-Uu28BQ","AA2YrTtdauSaxnClBPtmr_SN2rVvuAnfEQ","",2,1,200,"USA",null,null,"18","331",1],null,[1,0.1000000014901161,2,1],[1,0.001000000047497451,1],[1,0,0,null,"0","githubapp94@gmail.com","","AOEwXKpa2sV3Nv95lkKknze1nee_eU42icjN5K2Lo8MpI0uPPdPlmD524s0v1A48wmkN-8xSMbdMa6F4fTLtWrs6e7TLifXk0w"],[0,0,"",1,0,0,0,0,0,0,null,0,0,null,0,0,null,null,0,0,0,"","","","","","",null,0,0,0,0,0,null,null,null,"rgba(32,33,36,1)","rgba(255,255,255,1)",0,0,1,null,null,1,0,0,1],["%1$s (default)","Brand account",1,"%1$s (delegated)",1,null,83,"?authuser=$authuser",null,null,null,1,"https://accounts.google.com/ListAccounts?listPages=0\u0026pid=331\u0026gpsia=1\u0026source=ogb\u0026atic=1\u0026mo=1\u0026mn=1\u0026hl=en",0,"dashboard",null,null,null,null,"Profile","",1,null,"Signed out","https://accounts.google.com/AccountChooser?source=ogb\u0026continue=$continue\u0026Email=$email\u0026ec=GAhAywI","https://accounts.google.com/RemoveLocalAccount?source=ogb","Remove","Sign in",0,1,1,0,1,0,0,"",null,null,"Session expired",null,null,"https://docs.google.com/picker","Visitor",null,"Default","Delegated","Sign out of all accounts",0,1,null,0,0,1,"myaccount.google.com","https",0,0],null,["1","gci_91f30755d6a6b787dcc2a4062e6e9824.js","googleapis.client:gapi.iframes","0","en"],null,null,null,null,["m;/_/scs/abc-static/_/js/k=gapi.gapi.en.hvE_rrhCzPE.O/d=1/rs=AHpOoo-98F2Gk-siNaIBZOtcWfXQWKdTpQ/m=__features__","https://apis.google.com","","","1","",null,1,"es_plusone_gc_20211004.0_p0","en",null,0],[0.009999999776482582,"com","331",[null,"","0",null,1,5184000,null,null,"",null,null,null,null,null,0,null,0,0,1,0,0,0,null,null,0,0,null,0,0,0,0],null,null,null,0,null,null,["5061451","google\\.(com|ru|ca|by|kz|com\\.mx|com\\.tr)$",1]],[1,1,null,40400,331,"USA","en","406728538.0",8,0.009999999776482582,1,0,null,null,0,0,"3700930,3700949,3700962",null,null,null,"YCCCYcKbJ8yStAbUxZbACg",0,0],[[null,null,null,"https://www.gstatic.com/og/_/js/k=og.qtm.en_US.75zE3OGOif4.O/rt=j/m=qabr,qgl,q_dnp,qdid,qcwid,qbd,qapid/exm=qaaw,qadd,qaid,qein,qhaw,qhbr,qhch,qhga,qhid,qhin,qhpr/d=1/ed=1/rs=AA2YrTtxj8WxYDU47Y0XcqogWaw-Uu28BQ"],[null,null,null,"https://www.gstatic.com/og/_/ss/k=og.qtm.shRVBKchaBo.L.X.O/m=qdid,qcwid/excm=qaaw,qadd,qaid,qein,qhaw,qhbr,qhch,qhga,qhid,qhin,qhpr/d=1/ed=1/ct=zgms/rs=AA2YrTtdauSaxnClBPtmr_SN2rVvuAnfEQ"]],null,null,null,[[[null,null,[null,null,null,"https://ogs.google.com/u/0/widget/app?bc=1"],0,448,328,57,4,1,0,0,63,64,8000,"https://www.google.com/intl/en/about/products",67,1,69,null,1,70,"Can't seem to load the app launcher right now. Try again or go to the %1$sGoogle Products%2$s page.",3,0,0,74,4000]],0,[null,null,null,"https://www.gstatic.com/og/_/js/k=og.qtm.en_US.75zE3OGOif4.O/rt=j/m=qdsh/d=1/ed=1/rs=AA2YrTtxj8WxYDU47Y0XcqogWaw-Uu28BQ"],"18","331",1,0,null,"en",0],null,[["mousedown","touchstart","touchmove","wheel","keydown"],300000]]],};this.gbar_=this.gbar_||{};(function(_){var window=this;
try{
var ea,ia,qa,sa,Ba,Ca,Da,Ea,Fa,Ga,Ja,Ka,Oa,Pa;_.aa=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,_.aa);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))};_.n=function(a){return-1!=_.ba.indexOf(a)};_.ca=function(){return _.n("Trident")||_.n("MSIE")};_.da=function(){return _.n("Firefox")||_.n("FxiOS")};_.fa=function(){return _.n("Safari")&&!(ea()||_.n("Coast")||_.n("Opera")||_.n("Edge")||_.n("Edg/")||_.n("OPR")||_.da()||_.n("Silk")||_.n("Android"))};
ea=function(){return(_.n("Chrome")||_.n("CriOS"))&&!_.n("Edge")};_.ha=function(){return _.n("Android")&&!(ea()||_.da()||_.n("Opera")||_.n("Silk"))};ia=function(){return _.n("iPhone")&&!_.n("iPod")&&!_.n("iPad")};_.ja=function(){return ia()||_.n("iPad")||_.n("iPod")};_.la=function(a,b){return 0<=(0,_.ka)(a,b)};_.ma=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};_.na=function(){return-1!=_.ba.toLowerCase().indexOf("webkit")&&!_.n("Edge")};
_.pa=function(a){if(!Array.isArray(a))return a;Object.isFrozen(a)||(oa?a[oa]|=1:void 0!==a.ze?a.ze|=1:Object.defineProperties(a,{ze:{value:1,configurable:!0,writable:!0,enumerable:!1}}));return a};qa=function(a){return null!==a&&"object"===typeof a&&a.constructor===Object};sa=function(a,b){if(null!=a)return Array.isArray(a)||qa(a)?_.ra(a,b):b(a)};
_.ra=function(a,b){if(Array.isArray(a)){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=sa(a[d],b);if(a){var e;oa?e=a[oa]:e=a.ze;a=null==e?0:e}else a=0;a&1&&_.pa(c);return c}e={};for(c in a)e[c]=sa(a[c],b);return e};
_.wa=function(a){switch(typeof a){case "number":return isFinite(a)?a:String(a);case "object":if(_.ta&&null!=a&&a instanceof Uint8Array){var b;void 0===b&&(b=0);_.ua();b=va[b];for(var c=Array(Math.floor(a.length/3)),d=b[64]||"",e=0,f=0;e<a.length-2;e+=3){var g=a[e],k=a[e+1],l=a[e+2],m=b[g>>2];g=b[(g&3)<<4|k>>4];k=b[(k&15)<<2|l>>6];l=b[l&63];c[f++]=m+g+k+l}m=0;l=d;switch(a.length-e){case 2:m=a[e+1],l=b[(m&15)<<2]||d;case 1:a=a[e],c[f]=b[a>>2]+b[(a&3)<<4|m>>4]+l+d}a=c.join("")}return a;default:return a}};
_.p=function(a,b){return null!=a?!!a:!!b};_.q=function(a,b){void 0==b&&(b="");return null!=a?a:b};_.xa=function(a,b){void 0==b&&(b=0);return null!=a?a:b};_.ya=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};_.Aa=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<za.length;f++)c=za[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};Ba=function(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}};
Ca="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){if(a==Array.prototype||a==Object.prototype)return a;a[b]=c.value;return a};Da=function(a){a=["object"==typeof globalThis&&globalThis,a,"object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global];for(var b=0;b<a.length;++b){var c=a[b];if(c&&c.Math==Math)return c}throw Error("a");};Ea=Da(this);
Fa=function(a,b){if(b)a:{var c=Ea;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];if(!(e in c))break a;c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&Ca(c,a,{configurable:!0,writable:!0,value:b})}};
Fa("Symbol",function(a){if(a)return a;var b=function(f,g){this.j=f;Ca(this,"description",{configurable:!0,writable:!0,value:g})};b.prototype.toString=function(){return this.j};var c="jscomp_symbol_"+(1E9*Math.random()>>>0)+"_",d=0,e=function(f){if(this instanceof e)throw new TypeError("b");return new b(c+(f||"")+"_"+d++,f)};return e});
Fa("Symbol.iterator",function(a){if(a)return a;a=Symbol("c");for(var b="Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "),c=0;c<b.length;c++){var d=Ea[b[c]];"function"===typeof d&&"function"!=typeof d.prototype[a]&&Ca(d.prototype,a,{configurable:!0,writable:!0,value:function(){return Ga(Ba(this))}})}return a});Ga=function(a){a={next:a};a[Symbol.iterator]=function(){return this};return a};
_.Ha=function(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:Ba(a)}};Ja="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b};if("function"==typeof Object.setPrototypeOf)Ka=Object.setPrototypeOf;else{var La;a:{var Ma={a:!0},Na={};try{Na.__proto__=Ma;La=Na.a;break a}catch(a){}La=!1}Ka=La?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError("d`"+a);return a}:null}Oa=Ka;
_.t=function(a,b){a.prototype=Ja(b.prototype);a.prototype.constructor=a;if(Oa)Oa(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c];a.T=b.prototype};Pa=function(a,b,c){if(null==a)throw new TypeError("e`"+c);if(b instanceof RegExp)throw new TypeError("f`"+c);return a+""};
Fa("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Pa(this,b,"startsWith"),e=d.length,f=b.length;c=Math.max(0,Math.min(c|0,d.length));for(var g=0;g<f&&c<e;)if(d[c++]!=b[g++])return!1;return g>=f}});Fa("Array.prototype.find",function(a){return a?a:function(b,c){a:{var d=this;d instanceof String&&(d=String(d));for(var e=d.length,f=0;f<e;f++){var g=d[f];if(b.call(c,g,f,d)){b=g;break a}}b=void 0}return b}});var Qa=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};
Fa("WeakMap",function(a){function b(){}function c(l){var m=typeof l;return"object"===m&&null!==l||"function"===m}function d(l){if(!Qa(l,f)){var m=new b;Ca(l,f,{value:m})}}function e(l){var m=Object[l];m&&(Object[l]=function(r){if(r instanceof b)return r;Object.isExtensible(r)&&d(r);return m(r)})}if(function(){if(!a||!Object.seal)return!1;try{var l=Object.seal({}),m=Object.seal({}),r=new a([[l,2],[m,3]]);if(2!=r.get(l)||3!=r.get(m))return!1;r.delete(l);r.set(m,4);return!r.has(l)&&4==r.get(m)}catch(v){return!1}}())return a;
var f="$jscomp_hidden_"+Math.random();e("freeze");e("preventExtensions");e("seal");var g=0,k=function(l){this.j=(g+=Math.random()+1).toString();if(l){l=_.Ha(l);for(var m;!(m=l.next()).done;)m=m.value,this.set(m[0],m[1])}};k.prototype.set=function(l,m){if(!c(l))throw Error("g");d(l);if(!Qa(l,f))throw Error("h`"+l);l[f][this.j]=m;return this};k.prototype.get=function(l){return c(l)&&Qa(l,f)?l[f][this.j]:void 0};k.prototype.has=function(l){return c(l)&&Qa(l,f)&&Qa(l[f],this.j)};k.prototype.delete=function(l){return c(l)&&
Qa(l,f)&&Qa(l[f],this.j)?delete l[f][this.j]:!1};return k});
Fa("Map",function(a){if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var k=Object.seal({x:4}),l=new a(_.Ha([[k,"s"]]));if("s"!=l.get(k)||1!=l.size||l.get({x:4})||l.set({x:4},"t")!=l||2!=l.size)return!1;var m=l.entries(),r=m.next();if(r.done||r.value[0]!=k||"s"!=r.value[1])return!1;r=m.next();return r.done||4!=r.value[0].x||"t"!=r.value[1]||!m.next().done?!1:!0}catch(v){return!1}}())return a;var b=new WeakMap,c=function(k){this.o={};this.j=
f();this.size=0;if(k){k=_.Ha(k);for(var l;!(l=k.next()).done;)l=l.value,this.set(l[0],l[1])}};c.prototype.set=function(k,l){k=0===k?0:k;var m=d(this,k);m.list||(m.list=this.o[m.id]=[]);m.Xa?m.Xa.value=l:(m.Xa={next:this.j,kc:this.j.kc,head:this.j,key:k,value:l},m.list.push(m.Xa),this.j.kc.next=m.Xa,this.j.kc=m.Xa,this.size++);return this};c.prototype.delete=function(k){k=d(this,k);return k.Xa&&k.list?(k.list.splice(k.index,1),k.list.length||delete this.o[k.id],k.Xa.kc.next=k.Xa.next,k.Xa.next.kc=
k.Xa.kc,k.Xa.head=null,this.size--,!0):!1};c.prototype.clear=function(){this.o={};this.j=this.j.kc=f();this.size=0};c.prototype.has=function(k){return!!d(this,k).Xa};c.prototype.get=function(k){return(k=d(this,k).Xa)&&k.value};c.prototype.entries=function(){return e(this,function(k){return[k.key,k.value]})};c.prototype.keys=function(){return e(this,function(k){return k.key})};c.prototype.values=function(){return e(this,function(k){return k.value})};c.prototype.forEach=function(k,l){for(var m=this.entries(),
r;!(r=m.next()).done;)r=r.value,k.call(l,r[1],r[0],this)};c.prototype[Symbol.iterator]=c.prototype.entries;var d=function(k,l){var m=l&&typeof l;"object"==m||"function"==m?b.has(l)?m=b.get(l):(m=""+ ++g,b.set(l,m)):m="p_"+l;var r=k.o[m];if(r&&Qa(k.o,m))for(k=0;k<r.length;k++){var v=r[k];if(l!==l&&v.key!==v.key||l===v.key)return{id:m,list:r,index:k,Xa:v}}return{id:m,list:r,index:-1,Xa:void 0}},e=function(k,l){var m=k.j;return Ga(function(){if(m){for(;m.head!=k.j;)m=m.kc;for(;m.next!=m.head;)return m=
m.next,{done:!1,value:l(m)};m=null}return{done:!0,value:void 0}})},f=function(){var k={};return k.kc=k.next=k.head=k},g=0;return c});var Ra=function(a,b){a instanceof String&&(a+="");var c=0,d=!1,e={next:function(){if(!d&&c<a.length){var f=c++;return{value:b(f,a[f]),done:!1}}d=!0;return{done:!0,value:void 0}}};e[Symbol.iterator]=function(){return e};return e};Fa("Array.prototype.entries",function(a){return a?a:function(){return Ra(this,function(b,c){return[b,c]})}});
Fa("Array.prototype.keys",function(a){return a?a:function(){return Ra(this,function(b){return b})}});Fa("Number.MAX_SAFE_INTEGER",function(){return 9007199254740991});var Ta="function"==typeof Object.assign?Object.assign:function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(d)for(var e in d)Qa(d,e)&&(a[e]=d[e])}return a};Fa("Object.assign",function(a){return a||Ta});
Fa("Set",function(a){if(function(){if(!a||"function"!=typeof a||!a.prototype.entries||"function"!=typeof Object.seal)return!1;try{var c=Object.seal({x:4}),d=new a(_.Ha([c]));if(!d.has(c)||1!=d.size||d.add(c)!=d||1!=d.size||d.add({x:4})!=d||2!=d.size)return!1;var e=d.entries(),f=e.next();if(f.done||f.value[0]!=c||f.value[1]!=c)return!1;f=e.next();return f.done||f.value[0]==c||4!=f.value[0].x||f.value[1]!=f.value[0]?!1:e.next().done}catch(g){return!1}}())return a;var b=function(c){this.j=new Map;if(c){c=
_.Ha(c);for(var d;!(d=c.next()).done;)this.add(d.value)}this.size=this.j.size};b.prototype.add=function(c){c=0===c?0:c;this.j.set(c,c);this.size=this.j.size;return this};b.prototype.delete=function(c){c=this.j.delete(c);this.size=this.j.size;return c};b.prototype.clear=function(){this.j.clear();this.size=0};b.prototype.has=function(c){return this.j.has(c)};b.prototype.entries=function(){return this.j.entries()};b.prototype.values=function(){return this.j.values()};b.prototype.keys=b.prototype.values;
b.prototype[Symbol.iterator]=b.prototype.values;b.prototype.forEach=function(c,d){var e=this;this.j.forEach(function(f){return c.call(d,f,f,e)})};return b});Fa("Array.prototype.values",function(a){return a?a:function(){return Ra(this,function(b,c){return c})}});
Fa("Array.from",function(a){return a?a:function(b,c,d){c=null!=c?c:function(k){return k};var e=[],f="undefined"!=typeof Symbol&&Symbol.iterator&&b[Symbol.iterator];if("function"==typeof f){b=f.call(b);for(var g=0;!(f=b.next()).done;)e.push(c.call(d,f.value,g++))}else for(f=b.length,g=0;g<f;g++)e.push(c.call(d,b[g],g));return e}});Fa("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Qa(b,d)&&c.push([d,b[d]]);return c}});
Fa("Object.is",function(a){return a?a:function(b,c){return b===c?0!==b||1/b===1/c:b!==b&&c!==c}});Fa("Array.prototype.includes",function(a){return a?a:function(b,c){var d=this;d instanceof String&&(d=String(d));var e=d.length;c=c||0;for(0>c&&(c=Math.max(c+e,0));c<e;c++){var f=d[c];if(f===b||Object.is(f,b))return!0}return!1}});Fa("String.prototype.includes",function(a){return a?a:function(b,c){return-1!==Pa(this,b,"includes").indexOf(b,c||0)}});
Fa("Array.prototype.fill",function(a){return a?a:function(b,c,d){var e=this.length||0;0>c&&(c=Math.max(0,e+c));if(null==d||d>e)d=e;d=Number(d);0>d&&(d=Math.max(0,e+d));for(c=Number(c||0);c<d;c++)this[c]=b;return this}});var Ua=function(a){return a?a:Array.prototype.fill};Fa("Int8Array.prototype.fill",Ua);Fa("Uint8Array.prototype.fill",Ua);Fa("Uint8ClampedArray.prototype.fill",Ua);Fa("Int16Array.prototype.fill",Ua);Fa("Uint16Array.prototype.fill",Ua);Fa("Int32Array.prototype.fill",Ua);
Fa("Uint32Array.prototype.fill",Ua);Fa("Float32Array.prototype.fill",Ua);Fa("Float64Array.prototype.fill",Ua);
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
var Ya,Za,ab,bb,cb;_.Va=_.Va||{};_.u=this||self;_.Wa=function(){};_.Xa=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};_.$a=function(a){return Object.prototype.hasOwnProperty.call(a,Ya)&&a[Ya]||(a[Ya]=++Za)};Ya="closure_uid_"+(1E9*Math.random()>>>0);Za=0;ab=function(a,b,c){return a.call.apply(a.bind,arguments)};
bb=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}};_.w=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?_.w=ab:_.w=bb;return _.w.apply(null,arguments)};
_.y=function(a,b){a=a.split(".");var c=_.u;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b};_.z=function(a,b){function c(){}c.prototype=b.prototype;a.T=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.zl=function(d,e,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-2]=arguments[k];return b.prototype[e].apply(d,g)}};cb=function(a){return a};
_.db=function(a){var b=null,c=_.u.trustedTypes;if(!c||!c.createPolicy)return b;try{b=c.createPolicy(a,{createHTML:cb,createScript:cb,createScriptURL:cb})}catch(d){_.u.console&&_.u.console.error(d.message)}return b};
_.z(_.aa,Error);_.aa.prototype.name="CustomError";
_.eb="undefined"!==typeof TextDecoder;
_.fb=function(a,b){return 0==a.lastIndexOf(b,0)};_.gb=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};
a:{var hb=_.u.navigator;if(hb){var ib=hb.userAgent;if(ib){_.ba=ib;break a}}_.ba=""}
;_.ka=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if("string"===typeof a)return"string"!==typeof b||1!=b.length?-1:a.indexOf(b,0);for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};_.jb=Array.prototype.forEach?function(a,b,c){Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e="string"===typeof a?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};
_.kb=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g="string"===typeof a?a.split(""):a,k=0;k<d;k++)if(k in g){var l=g[k];b.call(c,l,k,a)&&(e[f++]=l)}return e};_.lb=Array.prototype.map?function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f="string"===typeof a?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};
_.mb=Array.prototype.reduce?function(a,b,c){return Array.prototype.reduce.call(a,b,c)}:function(a,b,c){var d=c;(0,_.jb)(a,function(e,f){d=b.call(void 0,d,e,f,a)});return d};_.nb=Array.prototype.some?function(a,b){return Array.prototype.some.call(a,b,void 0)}:function(a,b){for(var c=a.length,d="string"===typeof a?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a))return!0;return!1};
_.ob=function(a){_.ob[" "](a);return a};_.ob[" "]=_.Wa;
var Cb,Db,Ib;_.pb=_.n("Opera");_.B=_.ca();_.qb=_.n("Edge");_.rb=_.qb||_.B;_.sb=_.n("Gecko")&&!_.na()&&!(_.n("Trident")||_.n("MSIE"))&&!_.n("Edge");_.tb=_.na();_.ub=_.n("Macintosh");_.vb=_.n("Windows");_.wb=_.n("Linux")||_.n("CrOS");_.xb=_.n("Android");_.yb=ia();_.zb=_.n("iPad");_.Ab=_.n("iPod");_.Bb=_.ja();Cb=function(){var a=_.u.document;return a?a.documentMode:void 0};
a:{var Eb="",Fb=function(){var a=_.ba;if(_.sb)return/rv:([^\);]+)(\)|;)/.exec(a);if(_.qb)return/Edge\/([\d\.]+)/.exec(a);if(_.B)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(_.tb)return/WebKit\/(\S+)/.exec(a);if(_.pb)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Fb&&(Eb=Fb?Fb[1]:"");if(_.B){var Gb=Cb();if(null!=Gb&&Gb>parseFloat(Eb)){Db=String(Gb);break a}}Db=Eb}_.Hb=Db;if(_.u.document&&_.B){var Jb=Cb();Ib=Jb?Jb:parseInt(_.Hb,10)||void 0}else Ib=void 0;_.Kb=Ib;
_.Lb=_.da();_.Mb=ia()||_.n("iPod");_.Nb=_.n("iPad");_.Ob=_.ha();_.Pb=ea();_.Qb=_.fa()&&!_.ja();
var va;va={};_.Rb=null;_.ua=function(){if(!_.Rb){_.Rb={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));va[c]=d;for(var e=0;e<d.length;e++){var f=d[e];void 0===_.Rb[f]&&(_.Rb[f]=e)}}}};
_.ta="function"===typeof Uint8Array;
var oa="function"===typeof Symbol&&"symbol"===typeof Symbol()?Symbol(void 0):void 0;
_.Tb="function"===typeof Uint8Array.prototype.slice;
_.Vb=function(a,b){this.j=a;this.o=b;this.map={};this.A=!0;if(0<this.j.length){for(a=0;a<this.j.length;a++){b=this.j[a];var c=b[0];this.map[c.toString()]=new Ub(c,b[1])}this.A=!0}};_.h=_.Vb.prototype;_.h.isFrozen=function(){return!1};_.h.toJSON=function(){var a=this.ab();return _.Sb?a:_.ra(a,_.wa)};
_.h.ab=function(){if(this.A){if(this.o){var a=this.map,b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b].j;c&&c.ab()}}}else{this.j.length=0;a=Wb(this);a.sort();for(b=0;b<a.length;b++){c=this.map[a[b]];var d=c.j;d&&d.ab();this.j.push([c.key,c.value])}this.A=!0}return this.j};_.h.clear=function(){this.map={};this.A=!1};_.h.entries=function(){var a=[],b=Wb(this);b.sort();for(var c=0;c<b.length;c++){var d=this.map[b[c]];a.push([d.key,Xb(this,d)])}return new Yb(a)};
_.h.keys=function(){var a=[],b=Wb(this);b.sort();for(var c=0;c<b.length;c++)a.push(this.map[b[c]].key);return new Yb(a)};_.h.values=function(){var a=[],b=Wb(this);b.sort();for(var c=0;c<b.length;c++)a.push(Xb(this,this.map[b[c]]));return new Yb(a)};_.h.forEach=function(a,b){var c=Wb(this);c.sort();for(var d=0;d<c.length;d++){var e=this.map[c[d]];a.call(b,Xb(this,e),e.key,this)}};_.h.set=function(a,b){var c=new Ub(a);this.o?(c.j=b,c.value=b.ab()):c.value=b;this.map[a.toString()]=c;this.A=!1;return this};
var Xb=function(a,b){return a.o?(b.j||(b.j=new a.o(b.value),a.isFrozen()&&null(b.j)),b.j):b.value};_.Vb.prototype.get=function(a){if(a=this.map[a.toString()])return Xb(this,a)};_.Vb.prototype.has=function(a){return a.toString()in this.map};var Wb=function(a){a=a.map;var b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b};_.Vb.prototype[Symbol.iterator]=function(){return this.entries()};
var Ub=function(a,b){this.key=a;this.value=b;this.j=void 0},Yb=function(a){this.o=0;this.j=a};Yb.prototype.next=function(){return this.o<this.j.length?{done:!1,value:this.j[this.o++]}:{done:!0,value:void 0}};Yb.prototype[Symbol.iterator]=function(){return this};
var ac;_.D=function(a,b,c){var d=_.Zb;_.Zb=null;a||(a=d);d=this.constructor.jc;a||(a=d?[d]:[]);this.B=(d?0:-1)-(this.constructor.Fl||0);this.j=null;this.o=a;a:{d=this.o.length;a=d-1;if(d&&(d=this.o[a],qa(d))){this.C=a-this.B;this.A=d;break a}void 0!==b&&-1<b?(this.C=Math.max(b,a+1-this.B),this.A=null):this.C=Number.MAX_VALUE}if(c)for(b=0;b<c.length;b++)a=c[b],a<this.C?(a+=this.B,(d=this.o[a])?_.pa(d):this.o[a]=_.$b):(ac(this),(d=this.A[a])?_.pa(d):this.A[a]=_.$b)};_.$b=Object.freeze(_.pa([]));
ac=function(a){var b=a.C+a.B;a.o[b]||(a.A=a.o[b]={})};_.E=function(a,b,c){return-1===b?null:(void 0===c?0:c)||b>=a.C?a.A?a.A[b]:void 0:a.o[b+a.B]};_.bc=function(a,b){return null!=_.E(a,b)};_.F=function(a,b){a=_.E(a,b);return null==a?a:!!a};_.cc=function(a,b,c){a=_.E(a,b);return null==a?c:a};_.dc=function(a,b,c){a=_.E(a,b);a=null==a?a:+a;return null==a?void 0===c?0:c:a};_.G=function(a,b,c,d){(void 0===d?0:d)||b>=a.C?(ac(a),a.A[b]=c):a.o[b+a.B]=c;return a};
_.H=function(a,b,c,d,e){if(-1===c)return null;a.j||(a.j={});!a.j[c]&&(e=_.E(a,c,void 0===e?!1:e),d||e)&&(a.j[c]=new b(e));return a.j[c]};_.I=function(a,b,c){var d=void 0===d?!1:d;a.j||(a.j={});var e=c?c.ab():c;a.j[b]=c;return _.G(a,b,e,d)};_.D.prototype.toJSON=function(){var a=this.ab();return _.Sb?a:_.ra(a,_.wa)};_.D.prototype.ab=function(){if(this.j)for(var a in this.j){var b=this.j[a];if(Array.isArray(b))for(var c=0;c<b.length;c++)b[c]&&b[c].ab();else b&&b.ab()}return this.o};
_.D.prototype.toString=function(){return this.ab().toString()};_.ec=function(a,b,c){return _.cc(a,b,void 0===c?0:c)};
var fc=function(a){_.D.call(this,a)};_.t(fc,_.D);
_.hc=function(a){_.D.call(this,a)};_.t(_.hc,_.D);_.hc.prototype.od=function(a){return _.G(this,3,a)};
var ic=function(a){_.D.call(this,a)};_.t(ic,_.D);
_.jc=function(a){_.D.call(this,a)};_.t(_.jc,_.D);_.jc.prototype.If=function(a){return _.G(this,24,a)};
_.kc=function(a){_.D.call(this,a)};_.t(_.kc,_.D);
_.J=function(){this.Rb=this.Rb;this.Na=this.Na};_.J.prototype.Rb=!1;_.J.prototype.isDisposed=function(){return this.Rb};_.J.prototype.na=function(){this.Rb||(this.Rb=!0,this.R())};_.J.prototype.R=function(){if(this.Na)for(;this.Na.length;)this.Na.shift()()};
var lc=function(a){_.J.call(this);this.A=a;this.j=[];this.o={}};_.t(lc,_.J);lc.prototype.resolve=function(a){var b=this.A;a=a.split(".");for(var c=a.length,d=0;d<c;++d)if(b[a[d]])b=b[a[d]];else return null;return b instanceof Function?b:null};lc.prototype.Gd=function(){for(var a=this.j.length,b=this.j,c=[],d=0;d<a;++d){var e=b[d].j(),f=this.resolve(e);if(f&&f!=this.o[e])try{b[d].Gd(f)}catch(g){}else c.push(b[d])}this.j=c.concat(b.slice(a))};
var mc=function(a){_.J.call(this);this.A=a;this.C=this.j=null;this.B=0;this.D={};this.o=!1;a=window.navigator.userAgent;0<=a.indexOf("MSIE")&&0<=a.indexOf("Trident")&&(a=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a))&&a[1]&&9>parseFloat(a[1])&&(this.o=!0)};_.t(mc,_.J);mc.prototype.F=function(a,b){this.j=b;this.C=a;b.preventDefault?b.preventDefault():b.returnValue=!1};
_.nc=function(a){_.D.call(this,a)};_.t(_.nc,_.D);
_.oc=function(a){_.D.call(this,a)};_.t(_.oc,_.D);
_.pc=function(){this.data={}};_.pc.prototype.o=function(){window.console&&window.console.log&&window.console.log("Log data: ",this.data)};_.pc.prototype.j=function(a){var b=[],c;for(c in this.data)b.push(encodeURIComponent(c)+"="+encodeURIComponent(String(this.data[c])));return("atyp=i&zx="+(new Date).getTime()+"&"+b.join("&")).substr(0,a)};
var qc=function(a,b){this.data={};var c=_.H(a,ic,8)||new ic;window.google&&window.google.kEI&&(this.data.ei=window.google.kEI);this.data.sei=_.q(_.E(a,10));this.data.ogf=_.q(_.E(c,3));this.data.ogrp=(window.google&&window.google.sn?!/.*hp$/.test(window.google.sn):_.p(_.F(a,7)))?"1":"";this.data.ogv=_.q(_.E(c,6))+"."+_.q(_.E(c,7));this.data.ogd=_.q(_.E(a,21));this.data.ogc=_.q(_.E(a,20));this.data.ogl=_.q(_.E(a,5));b&&(this.data.oggv=b)};_.t(qc,_.pc);
var za="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
_.rc=function(a,b,c,d,e){qc.call(this,a,b);_.Aa(this.data,{jexpid:_.q(_.E(a,9)),srcpg:"prop="+_.q(_.E(a,6)),jsr:Math.round(1/d),emsg:c.name+":"+c.message});if(e){e._sn&&(e._sn="og."+e._sn);for(var f in e)this.data[encodeURIComponent(f)]=e[f]}};_.t(_.rc,qc);
var sc,tc=function(){void 0===sc&&(sc=_.db("ogb-qtm#html"));return sc};
var uc;_.vc=function(a,b){this.j=b===uc?a:""};_.h=_.vc.prototype;_.h.Sb=!0;_.h.Db=function(){return this.j.toString()};_.h.kf=!0;_.h.Cc=function(){return 1};_.h.toString=function(){return this.j+""};_.xc=function(a){return _.wc(a).toString()};_.wc=function(a){return a instanceof _.vc&&a.constructor===_.vc?a.j:"type_error:TrustedResourceUrl"};uc={};_.yc=function(a){var b=tc();a=b?b.createScriptURL(a):a;return new _.vc(a,uc)};
var Cc,Dc,Ec,zc;_.Ac=function(a,b){this.j=b===zc?a:""};_.h=_.Ac.prototype;_.h.Sb=!0;_.h.Db=function(){return this.j.toString()};_.h.kf=!0;_.h.Cc=function(){return 1};_.h.toString=function(){return this.j.toString()};_.Bc=function(a){return a instanceof _.Ac&&a.constructor===_.Ac?a.j:"type_error:SafeUrl"};
Cc=RegExp('^(?:audio/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-matroska|x-wav|wav|webm)|font/\\w+|image/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|video/(?:mpeg|mp4|ogg|webm|quicktime|x-matroska))(?:;\\w+=(?:\\w+|"[\\w;,= ]+"))*$',"i");Dc=/^data:(.*);base64,[a-z0-9+\/]+=*$/i;Ec=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
_.Gc=function(a){if(a instanceof _.Ac)return a;a="object"==typeof a&&a.Sb?a.Db():String(a);if(Ec.test(a))a=_.Fc(a);else{a=String(a);a=a.replace(/(%0A|%0D)/g,"");var b=a.match(Dc);a=b&&Cc.test(b[1])?_.Fc(a):null}return a};_.Hc=function(a){if(a instanceof _.Ac)return a;a="object"==typeof a&&a.Sb?a.Db():String(a);Ec.test(a)||(a="about:invalid#zClosurez");return _.Fc(a)};zc={};_.Fc=function(a){return new _.Ac(a,zc)};_.Ic=_.Fc("about:invalid#zClosurez");
_.Jc={};_.Kc=function(a,b){this.j=b===_.Jc?a:"";this.Sb=!0};_.Kc.prototype.Db=function(){return this.j};_.Kc.prototype.toString=function(){return this.j.toString()};_.Lc=new _.Kc("",_.Jc);_.Mc=RegExp("^[-,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$");_.Nc=RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))","g");
_.Oc=RegExp("\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)","g");
var Pc;Pc={};_.Qc=function(a,b,c){this.j=c===Pc?a:"";this.o=b;this.Sb=this.kf=!0};_.Qc.prototype.Cc=function(){return this.o};_.Qc.prototype.Db=function(){return this.j.toString()};_.Qc.prototype.toString=function(){return this.j.toString()};_.Rc=function(a){return a instanceof _.Qc&&a.constructor===_.Qc?a.j:"type_error:SafeHtml"};_.Sc=function(a,b){var c=tc();a=c?c.createHTML(a):a;return new _.Qc(a,b,Pc)};_.Tc=new _.Qc(_.u.trustedTypes&&_.u.trustedTypes.emptyHTML||"",0,Pc);_.Uc=_.Sc("<br>",0);
var Yc;_.Vc=function(a){var b=!1,c;return function(){b||(c=a(),b=!0);return c}}(function(){var a=document.createElement("div"),b=document.createElement("div");b.appendChild(document.createElement("div"));a.appendChild(b);b=a.firstChild.firstChild;a.innerHTML=_.Rc(_.Tc);return!b.parentElement});_.Xc=function(a){return _.Wc('style[nonce],link[rel="stylesheet"][nonce]',a)};Yc=/^[\w+/_-]+[=]{0,2}$/;
_.Wc=function(a,b){b=(b||_.u).document;return b.querySelector?(a=b.querySelector(a))&&(a=a.nonce||a.getAttribute("nonce"))&&Yc.test(a)?a:"":""};
_.Zc=RegExp("^\\s{3,4}at(?: (?:(.*?)\\.)?((?:new )?(?:[a-zA-Z_$][\\w$]*|<anonymous>))(?: \\[as ([a-zA-Z_$][\\w$]*)\\])?)? (?:\\(unknown source\\)|\\(native\\)|\\((?:eval at )?((?:http|https|file)://[^\\s)]+|javascript:.*)\\)|((?:http|https|file)://[^\\s)]+|javascript:.*))$");_.$c=RegExp("^(?:(.*?)\\.)?([a-zA-Z_$][\\w$]*(?:/.?<)?)?(\\(.*\\))?@(?::0|((?:http|https|file)://[^\\s)]+|javascript:.*))$");
var ad,dd,cd;_.bd=function(a){var b=window.google&&window.google.logUrl?"":"https://www.google.com";b+="/gen_204?use_corp=on&";b+=a.j(2040-b.length);ad(_.Gc(b)||_.Ic)};ad=function(a){var b=new Image,c=cd;b.onerror=b.onload=b.onabort=function(){c in dd&&delete dd[c]};dd[cd++]=b;b.src=_.Bc(a)};dd=[];cd=0;
_.ed=function(a){_.D.call(this,a)};_.t(_.ed,_.D);
_.fd=function(a){var b="Nc";if(a.Nc&&a.hasOwnProperty(b))return a.Nc;b=new a;return a.Nc=b};
_.gd=function(){this.j={};this.o={}};_.id=function(a,b){var c=_.gd.j();if(a in c.j){if(c.j[a]!=b)throw new hd(a);}else{c.j[a]=b;if(b=c.o[a])for(var d=0,e=b.length;d<e;d++)b[d].j(c.j,a);delete c.o[a]}};_.kd=function(a,b){if(b in a.j)return a.j[b];throw new jd(b);};_.gd.j=function(){return _.fd(_.gd)};var ld=function(){_.aa.call(this)};_.t(ld,_.aa);var hd=function(){_.aa.call(this)};_.t(hd,ld);var jd=function(){_.aa.call(this)};_.t(jd,ld);
var od=function(){var a=md;this.C=nd;this.o=_.xa(_.dc(a,2,.001),.001);this.D=_.p(_.F(a,1))&&Math.random()<this.o;this.F=_.xa(_.ec(a,3,1),1);this.B=0;this.j=this.A=null};od.prototype.log=function(a,b){if(this.j){var c=new fc;_.G(c,1,a.message);_.G(c,2,a.stack);_.G(c,3,a.lineNumber);_.G(c,5,1);var d=new _.hc;_.I(d,40,c);this.j.log(98,d)}try{if(this.D&&this.B<this.F){try{var e=(this.A||_.kd(_.gd.j(),"lm")).B(a,b)}catch(f){e=new _.rc(this.C,"quantum:gapiBuildLabel",a,this.o,b)}_.bd(e);this.B++}}catch(f){}};
var pd=[1,2,3,4,5,6,9,10,11,13,14,28,29,30,34,35,37,38,39,40,42,43,48,49,50,51,52,53,62,500],sd=function(a,b,c,d,e,f){qc.call(this,a,b);_.Aa(this.data,{oge:d,ogex:_.q(_.E(a,9)),ogp:_.q(_.E(a,6)),ogsr:Math.round(1/(qd(d)?_.xa(_.dc(c,3,1)):_.xa(_.dc(c,2,1E-4)))),ogus:e});if(f){"ogw"in f&&(this.data.ogw=f.ogw,delete f.ogw);"ved"in f&&(this.data.ved=f.ved,delete f.ved);a=[];for(var g in f)0!=a.length&&a.push(","),a.push(rd(g)),a.push("."),a.push(rd(f[g]));f=a.join("");""!=f&&(this.data.ogad=f)}};
_.t(sd,qc);var rd=function(a){a=String(a);return a.replace(".","%2E").replace(",","%2C")},qd=function(a){if(!td){td={};for(var b=0;b<pd.length;b++)td[pd[b]]=!0}return!!td[a]},td=null;
var ud=function(a){_.D.call(this,a)};_.t(ud,_.D);
var yd=function(){var a=vd,b=wd,c=xd;this.o=a;this.j=b;this.B=_.xa(_.dc(a,2,1E-4),1E-4);this.D=_.xa(_.dc(a,3,1),1);b=Math.random();this.A=_.p(_.F(a,1))&&b<this.B;this.C=_.p(_.F(a,1))&&b<this.D;a=0;_.p(_.F(c,1))&&(a|=1);_.p(_.F(c,2))&&(a|=2);_.p(_.F(c,3))&&(a|=4);this.F=a};yd.prototype.log=function(a,b){try{if(qd(a)?this.C:this.A){var c=new sd(this.j,"quantum:gapiBuildLabel",this.o,a,this.F,b);_.bd(c)}}catch(d){}};
_.zd=function(a){this.j=a;this.o=void 0;this.A=[]};_.zd.prototype.then=function(a,b,c){this.A.push(new Ad(a,b,c));Bd(this)};_.zd.prototype.resolve=function(a){if(void 0!==this.j||void 0!==this.o)throw Error("D");this.j=a;Bd(this)};_.zd.prototype.reject=function(a){if(void 0!==this.j||void 0!==this.o)throw Error("D");this.o=a;Bd(this)};var Bd=function(a){if(0<a.A.length){var b=void 0!==a.j,c=void 0!==a.o;if(b||c){b=b?a.B:a.C;c=a.A;a.A=[];try{_.jb(c,b,a)}catch(d){console.error(d)}}}};
_.zd.prototype.B=function(a){a.o&&a.o.call(a.j,this.j)};_.zd.prototype.C=function(a){a.A&&a.A.call(a.j,this.o)};var Ad=function(a,b,c){this.o=a;this.A=b;this.j=c};
_.K=function(){this.B=new _.zd;this.j=new _.zd;this.G=new _.zd;this.D=new _.zd;this.F=new _.zd;this.J=new _.zd;this.C=new _.zd;this.A=new _.zd;this.o=new _.zd;this.K=new _.zd};_.h=_.K.prototype;_.h.Di=function(){return this.B};_.h.Li=function(){return this.j};_.h.Si=function(){return this.G};_.h.Ki=function(){return this.D};_.h.Qi=function(){return this.F};_.h.Hi=function(){return this.J};_.h.Ii=function(){return this.C};_.h.xi=function(){return this.A};_.h.wi=function(){return this.o};_.K.j=function(){return _.fd(_.K)};
var Cd=function(a){_.D.call(this,a)};_.t(Cd,_.D);_.Ed=function(){return _.H(_.Dd,_.jc,1)};_.Fd=function(){return _.H(_.Dd,_.kc,5)};
var Gd;window.gbar_&&window.gbar_.CONFIG?Gd=window.gbar_.CONFIG[0]||{}:Gd=[];_.Dd=new Cd(Gd);
var md,nd,wd,xd,vd;md=_.H(_.Dd,_.ed,3)||new _.ed;nd=_.Ed()||new _.jc;_.Hd=new od;wd=_.Ed()||new _.jc;xd=_.Fd()||new _.kc;vd=_.H(_.Dd,ud,4)||new ud;_.Id=new yd;
_.y("gbar_._DumpException",function(a){_.Hd?_.Hd.log(a):console.error(a)});
_.Jd=new mc(_.Hd);
_.Id.log(8,{m:"BackCompat"==document.compatMode?"q":"s"});_.y("gbar.A",_.zd);_.zd.prototype.aa=_.zd.prototype.then;_.y("gbar.B",_.K);_.K.prototype.ba=_.K.prototype.Li;_.K.prototype.bb=_.K.prototype.Si;_.K.prototype.bd=_.K.prototype.Qi;_.K.prototype.bf=_.K.prototype.Di;_.K.prototype.bg=_.K.prototype.Ki;_.K.prototype.bh=_.K.prototype.Hi;_.K.prototype.bi=_.K.prototype.Ii;_.K.prototype.bj=_.K.prototype.xi;_.K.prototype.bk=_.K.prototype.wi;_.y("gbar.a",_.K.j());var Kd=new lc(window);_.id("api",Kd);
var Ld=_.Fd()||new _.kc;window.__PVT=_.q(_.E(Ld,8));_.id("eq",_.Jd);

}catch(e){_._DumpException(e)}
try{
var Md=function(a){_.D.call(this,a)};_.t(Md,_.D);
var Nd=function(){_.J.call(this);this.o=[];this.j=[]};_.t(Nd,_.J);Nd.prototype.A=function(a,b){this.o.push({features:a,options:b})};Nd.prototype.init=function(a,b,c){window.gapi={};var d=window.___jsl={};d.h=_.q(_.E(a,1));_.bc(a,12)&&(d.dpo=_.p(_.F(a,12)));d.ms=_.q(_.E(a,2));d.m=_.q(_.E(a,3));d.l=[];_.E(b,1)&&(a=_.E(b,3))&&this.j.push(a);_.E(c,1)&&(c=_.E(c,2))&&this.j.push(c);_.y("gapi.load",(0,_.w)(this.A,this));return this};
var Od=_.H(_.Dd,_.nc,14)||new _.nc,Pd=_.H(_.Dd,_.oc,9)||new _.oc,Qd=new Md,Rd=new Nd;Rd.init(Od,Pd,Qd);_.id("gs",Rd);

}catch(e){_._DumpException(e)}
})(this.gbar_);
// Google Inc.
</script><script id="ogb-head-script2">this.gbar_=this.gbar_||{};(function(_){var window=this;
try{
_.Sd=function(a,b,c){if(!a.o)if(c instanceof Array){c=_.Ha(c);for(var d=c.next();!d.done;d=c.next())_.Sd(a,b,d.value)}else{d=(0,_.w)(a.F,a,b);var e=a.B+c;a.B++;b.setAttribute("data-eqid",e);a.D[e]=d;b&&b.addEventListener?b.addEventListener(c,d,!1):b&&b.attachEvent?b.attachEvent("on"+c,d):a.A.log(Error("x`"+b))}};

}catch(e){_._DumpException(e)}
try{
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
_.Td=function(){if(!_.u.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});try{_.u.addEventListener("test",_.Wa,b),_.u.removeEventListener("test",_.Wa,b)}catch(c){}return a}();
_.Ud=_.tb?"webkitTransitionEnd":"transitionend";

}catch(e){_._DumpException(e)}
try{
var Vd=document.querySelector(".gb_B .gb_C"),Wd=document.querySelector("#gb.gb_Dc");Vd&&!Wd&&_.Sd(_.Jd,Vd,"click");

}catch(e){_._DumpException(e)}
try{
var Fh=function(a){_.J.call(this);this.C=a;this.A=null;this.o={};this.D={};this.j={};this.B=null};_.t(Fh,_.J);_.Gh=function(a){if(a.A)return a.A;for(var b in a.j)if(a.j[b].mf()&&a.j[b].Pb())return a.j[b];return null};_.h=Fh.prototype;_.h.Gf=function(a){a&&_.Gh(this)&&a!=_.Gh(this)&&_.Gh(this).ae(!1);this.A=a};_.h.Lg=function(a){a=this.j[a]||a;return _.Gh(this)==a};_.h.Ve=function(a,b){b=b.Wc();if(this.o[a]&&this.o[a][b])for(var c=0;c<this.o[a][b].length;c++)try{this.o[a][b][c]()}catch(d){this.C.log(d)}};
_.h.Yh=function(a){return!this.D[a.Wc()]};_.h.ih=function(a){this.j[a]&&(_.Gh(this)&&_.Gh(this).Wc()==a||this.j[a].ae(!0))};_.h.$a=function(a){this.B=a;for(var b in this.j)this.j[b].mf()&&this.j[b].$a(a)};_.h.Cf=function(a){this.j[a.Wc()]=a};_.h.Me=function(a){return a in this.j?this.j[a]:null};var Hh=new Fh(_.Hd);_.id("dd",Hh);

}catch(e){_._DumpException(e)}
try{
_.jj=function(a,b){a=a.split(".");b=b||_.u;for(var c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b};

}catch(e){_._DumpException(e)}
try{
var kj=document.querySelector(".gb_Na .gb_C"),lj=document.querySelector("#gb.gb_Dc");kj&&!lj&&_.Sd(_.Jd,kj,"click");

}catch(e){_._DumpException(e)}
})(this.gbar_);
// Google Inc.
</script><script id="ogb-head-script3">this.gbar_=this.gbar_||{};(function(_){var window=this;
try{
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
_.Xd=function(a){var b=typeof a;return"object"!=b?b:a?Array.isArray(a)?"array":b:"null"};_.Yd=function(a){var b=_.Xd(a);return"array"==b||"object"==b&&"number"==typeof a.length};_.Zd=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var d=c.slice();d.push.apply(d,arguments);return a.apply(this,d)}};try{(new self.OffscreenCanvas(0,0)).getContext("2d")}catch(a){}_.$d=_.B||_.tb;
_.ae=function(a,b){this.width=a;this.height=b};_.h=_.ae.prototype;_.h.aspectRatio=function(){return this.width/this.height};_.h.Tb=function(){return!(this.width*this.height)};_.h.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};_.h.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};_.h.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
var de;_.be=function(a,b){return(b||document).getElementsByTagName(String(a))};_.L=function(a,b){var c=b||document;if(c.getElementsByClassName)a=c.getElementsByClassName(a)[0];else{c=document;var d=b||c;a=d.querySelectorAll&&d.querySelector&&a?d.querySelector(a?"."+a:""):_.ce(c,"*",a,b)[0]||null}return a||null};
_.ce=function(a,b,c,d){a=d||a;b=b&&"*"!=b?String(b).toUpperCase():"";if(a.querySelectorAll&&a.querySelector&&(b||c))return a.querySelectorAll(b+(c?"."+c:""));if(c&&a.getElementsByClassName){a=a.getElementsByClassName(c);if(b){d={};for(var e=0,f=0,g;g=a[f];f++)b==g.nodeName&&(d[e++]=g);d.length=e;return d}return a}a=a.getElementsByTagName(b||"*");if(c){d={};for(f=e=0;g=a[f];f++)b=g.className,"function"==typeof b.split&&_.la(b.split(/\s+/),c)&&(d[e++]=g);d.length=e;return d}return a};
_.ee=function(a,b){_.ya(b,function(c,d){c&&"object"==typeof c&&c.Sb&&(c=c.Db());"style"==d?a.style.cssText=c:"class"==d?a.className=c:"for"==d?a.htmlFor=c:de.hasOwnProperty(d)?a.setAttribute(de[d],c):_.fb(d,"aria-")||_.fb(d,"data-")?a.setAttribute(d,c):a[d]=c})};de={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};
_.he=function(a,b){var c=b[1],d=_.fe(a,String(b[0]));c&&("string"===typeof c?d.className=c:Array.isArray(c)?d.className=c.join(" "):_.ee(d,c));2<b.length&&_.ge(a,d,b,2);return d};
_.ge=function(a,b,c,d){function e(k){k&&b.appendChild("string"===typeof k?a.createTextNode(k):k)}for(;d<c.length;d++){var f=c[d];if(!_.Yd(f)||_.Xa(f)&&0<f.nodeType)e(f);else{a:{if(f&&"number"==typeof f.length){if(_.Xa(f)){var g="function"==typeof f.item||"string"==typeof f.item;break a}if("function"===typeof f){g="function"==typeof f.item;break a}}g=!1}_.jb(g?_.ma(f):f,e)}}};_.ie=function(a){return _.fe(document,a)};
_.fe=function(a,b){b=String(b);"application/xhtml+xml"===a.contentType&&(b=b.toLowerCase());return a.createElement(b)};_.je=function(a){for(var b;b=a.firstChild;)a.removeChild(b)};_.ke=function(a){return a&&a.parentNode?a.parentNode.removeChild(a):null};_.le=function(a){return _.Xa(a)&&1==a.nodeType};_.me=function(a){return 9==a.nodeType?a:a.ownerDocument||a.document};_.ne=function(a,b,c){for(var d=0;a&&(null==c||d<=c);){if(b(a))return a;a=a.parentNode;d++}return null};

}catch(e){_._DumpException(e)}
try{
_.pj=function(a){_.D.call(this,a)};_.t(_.pj,_.D);

}catch(e){_._DumpException(e)}
try{
_.qj=function(a,b,c){a.rel=c;-1!=c.toLowerCase().indexOf("stylesheet")?(a.href=_.xc(b),(b=_.Xc(a.ownerDocument&&a.ownerDocument.defaultView))&&a.setAttribute("nonce",b)):a.href=b instanceof _.vc?_.xc(b):b instanceof _.Ac?_.Bc(b):_.Bc(_.Hc(b))};

}catch(e){_._DumpException(e)}
try{
_.rj=function(){var a="undefined"!==typeof window?window.trustedTypes:void 0;return null!==a&&void 0!==a?a:null};_.tj=function(a){if("undefined"!=typeof _.sj&&a instanceof _.sj)return a.j;throw Error("C");};_.uj=function(a){var b,c=(a.ownerDocument&&a.ownerDocument.defaultView||window).document,d=null===(b=c.querySelector)||void 0===b?void 0:b.call(c,"script[nonce]");(b=d?d.nonce||d.getAttribute("nonce")||"":"")&&a.setAttribute("nonce",b)};
_.wj=function(a,b){b="undefined"!=typeof _.vj&&b instanceof _.vj?_.tj(b):_.wc(b);a.src=b;_.uj(a)};
/*

 SPDX-License-Identifier: Apache-2.0
*/

}catch(e){_._DumpException(e)}
try{
var xj=function(a,b,c){_.Id.log(46,{att:a,max:b,url:c})},zj=function(a,b,c){_.Id.log(47,{att:a,max:b,url:c});a<b?yj(a+1,b):_.Hd.log(Error("aa`"+a+"`"+b),{url:c})},yj=function(a,b){if(Aj){var c=_.ie("SCRIPT");c.async=!0;c.type="text/javascript";c.charset="UTF-8";_.wj(c,Aj);c.onload=_.Zd(xj,a,b,c.src);c.onerror=_.Zd(zj,a,b,c.src);_.Id.log(45,{att:a,max:b,url:c.src});_.be("HEAD")[0].appendChild(c)}},Bj=function(a){_.D.call(this,a)};_.t(Bj,_.D);
var Cj=_.H(_.Dd,Bj,17)||new Bj,Dj,Aj=(Dj=_.H(Cj,_.pj,1))?_.yc(_.E(Dj,4)||""):null,Ej,Fj=(Ej=_.H(Cj,_.pj,2))?_.yc(_.E(Ej,4)||""):null,Gj=function(){yj(1,2);if(Fj){var a=_.ie("LINK");a.setAttribute("type","text/css");_.qj(a,Fj,"stylesheet");var b=_.Xc();b&&a.setAttribute("nonce",b);_.be("HEAD")[0].appendChild(a)}};
(function(){var a=_.Ed();if(_.F(a,18))Gj();else{var b=_.E(a,19)||0;window.addEventListener("load",function(){window.setTimeout(Gj,b)})}})();

}catch(e){_._DumpException(e)}
})(this.gbar_);
// Google Inc.
</script><script async="" type="text/javascript" charset="UTF-8" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/rs=AA2YrTtxj8WxYDU47Y0XcqogWaw-Uu28BQ" nonce=""></script><link type="text/css" rel="stylesheet" href="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/rs=AA2YrTtdauSaxnClBPtmr_SN2rVvuAnfEQ"><script type="text/javascript" charset="UTF-8" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/api.js" nonce="" gapi_processed="true"></script></head>
  <body class="" template="page" theme="white" type="article" layout="docs" ready="" style="--devsite-js-header-top-row-height:49px; --devsite-js-header-lower-section-height:108px; --devsite-js-header-lower-tabs-height:48px; --devsite-js-header-height:157px; --devsite-js-header-lower-tabs-offset:0px; --devsite-js-sidebar-max-height:557px; --devsite-js-sidebar-max-width:144px; --devsite-js-sidebar-offset:0; --devsite-js-book-nav-scrollbar-width:8px;" signed-in="">
    <devsite-progress id="app-progress"></devsite-progress>
  
    <section class="devsite-wrapper"><devsite-header top-row--height="49" bottom-row--height="108" bottom-tabs--height="48" fixed="">
  
    


























<div class="devsite-header--inner nocontent">
  <div class="devsite-top-logo-row-wrapper-wrapper">
    <div class="devsite-top-logo-row-wrapper">
      <div class="devsite-top-logo-row">
        <button type="button" id="devsite-hamburger-menu" class="devsite-header-icon-button button-flat material-icons gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Navigation menu button" aria-label="Open menu">
        </button>
        <div class="devsite-product-name-wrapper">

  
    
  
  <a href="https://developers.google.com/apps-script?authuser=0">
    
  <div class="devsite-product-logo-container" size="medium">
  
    <img class="devsite-product-logo" alt="Google Apps Script" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/apps_script_48dp.png" srcset="" sizes="64px" loading="lazy">
  
  </div>
  
  </a>
  

  



  
  
  <span class="devsite-product-name">
    <ul class="devsite-breadcrumb-list">
  
  <li class="devsite-breadcrumb-item
             devsite-has-google-wordmark">
    
    
    
      
      
        
  <a href="https://developers.google.com/apps-script?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Upper Header" data-value="1" track-type="globalNav" track-name="breadcrumb" track-metadata-position="1" track-metadata-eventdetail="Google Apps Script">
    
          <svg class="devsite-google-wordmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148 48">
    <title>Google</title>
    <path class="devsite-google-wordmark-svg-path" d="M19.58,37.65c-9.87,0-18.17-8.04-18.17-17.91c0-9.87,8.3-17.91,18.17-17.91c5.46,0,9.35,2.14,12.27,4.94l-3.45,3.45c-2.1-1.97-4.93-3.49-8.82-3.49c-7.21,0-12.84,5.81-12.84,13.02c0,7.21,5.64,13.02,12.84,13.02c4.67,0,7.34-1.88,9.04-3.58c1.4-1.4,2.32-3.41,2.66-6.16H19.58v-4.89h16.47c0.18,0.87,0.26,1.92,0.26,3.06c0,3.67-1.01,8.21-4.24,11.44C28.93,35.9,24.91,37.65,19.58,37.65z M61.78,26.12c0,6.64-5.1,11.53-11.36,11.53s-11.36-4.89-11.36-11.53c0-6.68,5.1-11.53,11.36-11.53S61.78,19.43,61.78,26.12z M56.8,26.12c0-4.15-2.96-6.99-6.39-6.99c-3.43,0-6.39,2.84-6.39,6.99c0,4.11,2.96,6.99,6.39,6.99C53.84,33.11,56.8,30.22,56.8,26.12z M87.25,26.12c0,6.64-5.1,11.53-11.36,11.53c-6.26,0-11.36-4.89-11.36-11.53c0-6.68,5.1-11.53,11.36-11.53C82.15,14.59,87.25,19.43,87.25,26.12zM82.28,26.12c0-4.15-2.96-6.99-6.39-6.99c-3.43,0-6.39,2.84-6.39,6.99c0,4.11,2.96,6.99,6.39,6.99C79.32,33.11,82.28,30.22,82.28,26.12z M112.09,15.29v20.7c0,8.52-5.02,12.01-10.96,12.01c-5.59,0-8.95-3.76-10.22-6.81l4.41-1.83c0.79,1.88,2.71,4.1,5.81,4.1c3.8,0,6.16-2.36,6.16-6.77v-1.66h-0.18c-1.14,1.4-3.32,2.62-6.07,2.62c-5.76,0-11.05-5.02-11.05-11.49c0-6.51,5.28-11.57,11.05-11.57c2.75,0,4.93,1.22,6.07,2.58h0.18v-1.88H112.09z M107.64,26.16c0-4.06-2.71-7.03-6.16-7.03c-3.49,0-6.42,2.97-6.42,7.03c0,4.02,2.93,6.94,6.42,6.94C104.93,33.11,107.64,30.18,107.64,26.16z M120.97,3.06v33.89h-5.07V3.06H120.97z M140.89,29.92l3.93,2.62c-1.27,1.88-4.32,5.11-9.61,5.11c-6.55,0-11.28-5.07-11.28-11.53c0-6.86,4.77-11.53,10.71-11.53c5.98,0,8.91,4.76,9.87,7.34l0.52,1.31l-15.42,6.38c1.18,2.31,3.01,3.49,5.59,3.49C137.79,33.11,139.58,31.84,140.89,29.92zM128.79,25.77l10.31-4.28c-0.57-1.44-2.27-2.45-4.28-2.45C132.24,19.04,128.66,21.31,128.79,25.77z"></path>
  </svg>Apps Script
        
  </a>
  
      
    
  </li>
  
</ul>
  </span>

</div>
        <div class="devsite-top-logo-row-middle">
          <div class="devsite-header-upper-tabs">
            
              
              
  <devsite-tabs class="upper-tabs" connected="">

    

  <nav class="devsite-tabs-wrapper" aria-label="Upper tabs">
      
        
          <tab active="">
            <a href="https://developers.google.com/apps-script/overview?authuser=0" class="gc-analytics-event " track-type="nav" track-name="learn apps script" track-metadata-eventdetail="https://developers.google.com/apps-script/overview?authuser=0" track-metadata-position="nav - learn apps script" track-metadata-module="primary nav" aria-label="Learn Apps Script, selected" data-category="Apps Script top tabs" data-label="Apps Script tab">
  Learn Apps Script
</a>

          </tab>
        
      
        
          <tab>
            <a href="https://developers.google.com/apps-script/add-ons/overview?authuser=0" class="gc-analytics-event " track-type="nav" track-name="build add-ons" track-metadata-eventdetail="https://developers.google.com/apps-script/add-ons/overview?authuser=0" track-metadata-position="nav - build add-ons" track-metadata-module="primary nav" data-category="Apps Script top tabs" data-label="Add-ons tab">
  Build add-ons
</a>

          </tab>
        
      
        
          <tab>
            <a href="https://developers.google.com/apps-script/api/concepts?authuser=0" class="gc-analytics-event " track-type="nav" track-name="use the rest api" track-metadata-eventdetail="https://developers.google.com/apps-script/api/concepts?authuser=0" track-metadata-position="nav - use the rest api" track-metadata-module="primary nav" data-category="Apps Script top tabs" data-label="REST API tab">
  Use the REST API
</a>

          </tab>
        
      
    <tab overflow-tab="" hidden=""><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#" class="devsite-icon devsite-icon-arrow-drop-down">More</a><div class="devsite-tabs-overflow-menu" scrollbars="" hidden=""></div></tab></nav></devsite-tabs>

            
           </div>
          
<devsite-search aria-expanded="false" aria-haspopup="listbox" enable-signin="" enable-search="" enable-suggestions="" enable-query-completion="" project-name="Apps Script" tenant-name="Google Developers" project-scope="/apps-script" url-scoped="https://developers.google.com/s/results/apps-script?authuser=0" role="combobox">
  <form class="devsite-search-form" action="https://developers.google.com/s/results?authuser=0" method="GET">
    <div class="devsite-search-container">
      <div class="devsite-searchbox">
        <input aria-activedescendant="" aria-autocomplete="list" aria-label="Search" aria-haspopup="false" aria-multiline="false" autocomplete="off" class="devsite-search-field devsite-search-query" name="q" placeholder="Search" role="searchbox" type="text" value="" aria-controls="devsite-search-popout-container-id-1">
        <div class="devsite-search-image material-icons" aria-hidden="true"></div>
      </div>
      <button type="button" search-open="" class="devsite-search-button devsite-header-icon-button button-flat material-icons" aria-label="Open search"></button>
    </div>
  <div class="devsite-popout" id="devsite-search-popout-container-id-1"><div class="devsite-popout-result devsite-suggest-results-container" devsite-hide=""></div></div></form>
  <button type="button" search-close="" class="devsite-search-button devsite-header-icon-button button-flat material-icons" aria-label="Close search"></button>
</devsite-search>

        <div class="devsite-search-background" style="opacity: 1;"></div></div>

        

        

        
<devsite-language-selector>
  <devsite-select class="devsite-language-selector-menu">
    
    <select aria-label="Select your language preference." class="devsite-language-selector-select" name="language" track-name="click" track-type="languageSelector">
    
    
      <option value="en" lang="en" selected="selected">
        English
      </option>
    
      <option value="id" lang="id">
        Bahasa Indonesia
      </option>
    
      <option value="de" lang="de">
        Deutsch
      </option>
    
      <option value="es" lang="es">
        Español
      </option>
    
      <option value="fr" lang="fr">
        Français
      </option>
    
      <option value="pt_br" lang="pt_br">
        Português – Brasil
      </option>
    
      <option value="ru" lang="ru">
        Русский
      </option>
    
      <option value="zh_cn" lang="zh_cn">
        中文 – 简体
      </option>
    
      <option value="ja" lang="ja">
        日本語
      </option>
    
      <option value="ko" lang="ko">
        한국어
      </option>
    
    </select>
  <div class="devsite-select"><label id="devsite-select-1027870212683505313-label" style="display:none;" aria-label="Select your language preference.">Select an option</label><button type="button" class="devsite-select-toggle" id="devsite-select-1027870212683505313-button" aria-haspopup="true" aria-labelledby="devsite-select-1027870212683505313-label devsite-select-1027870212683505313-button" aria-controls="devsite-select-1027870212683505313-popup"><span class="devsite-select-toggle-label">English</span><span class="devsite-icon devsite-icon-arrow-drop-down devsite-select-toggle-icon" aria-hidden="true"></span></button><ul class="devsite-select-list" id="devsite-select-1027870212683505313-popup" tabindex="-1" role="listbox" scrollbars="" aria-labelledby="devsite-select-1027870212683505313-button"><li role="option" lang="en" value="en" id="devsite-select-1027870212683505313-0" class="devsite-select-item" data-index="0" data-selected="" aria-selected="true" aria-label="English, selected">English</li><li role="option" lang="id" value="id" id="devsite-select-1027870212683505313-1" class="devsite-select-item" data-index="1" aria-selected="false" aria-label="Bahasa Indonesia">Bahasa Indonesia</li><li role="option" lang="de" value="de" id="devsite-select-1027870212683505313-2" class="devsite-select-item" data-index="2" aria-selected="false" aria-label="Deutsch">Deutsch</li><li role="option" lang="es" value="es" id="devsite-select-1027870212683505313-3" class="devsite-select-item" data-index="3" aria-selected="false" aria-label="Español">Español</li><li role="option" lang="fr" value="fr" id="devsite-select-1027870212683505313-4" class="devsite-select-item" data-index="4" aria-selected="false" aria-label="Français">Français</li><li role="option" lang="pt_br" value="pt_br" id="devsite-select-1027870212683505313-5" class="devsite-select-item" data-index="5" aria-selected="false" aria-label="Português – Brasil">Português – Brasil</li><li role="option" lang="ru" value="ru" id="devsite-select-1027870212683505313-6" class="devsite-select-item" data-index="6" aria-selected="false" aria-label="Русский">Русский</li><li role="option" lang="zh_cn" value="zh_cn" id="devsite-select-1027870212683505313-7" class="devsite-select-item" data-index="7" aria-selected="false" aria-label="中文 – 简体">中文 – 简体</li><li role="option" lang="ja" value="ja" id="devsite-select-1027870212683505313-8" class="devsite-select-item" data-index="8" aria-selected="false" aria-label="日本語">日本語</li><li role="option" lang="ko" value="ko" id="devsite-select-1027870212683505313-9" class="devsite-select-item" data-index="9" aria-selected="false" aria-label="한국어">한국어</li></ul></div></devsite-select>
</devsite-language-selector>


        

        
          
          
          <devsite-user signed-in="" enable-profiles="" fp-auth="" id="devsite-user" sign-in-url="https://developers.google.com/_d/signin?continue=https%3A%2F%2Fdevelopers.google.com%2Fapps-script%2Fadvanced%2Fadmin-sdk-directory&amp;prompt=select_account" sign-out-url="https://developers.google.com/_d/signout?continue=https%3A%2F%2Fdevelopers.google.com%2Fapps-script%2Fadvanced%2Fadmin-sdk-directory" url="https://developers.google.com/_d/signin?continue=https%3A%2F%2Fdevelopers.google.com%2Fapps-script%2Fadvanced%2Fadmin-sdk-directory&amp;prompt=select_account"><div class="ogb-wrapper ogb-so"><div class="devsite-devprofile-wrapper show"><button class="devsite-devprofile-button" data-tooltip="Google Developer Profile"><svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM0 14C0 12.9 0.9 12 2 12C3.1 12 4 12.9 4 14C4 15.1 3.1 16 2 16C0.9 16 0 15.1 0 14Z" fill="#5F6368"></path></svg></button><div class="devsite-devprofile-popout visible" popup-type="view-bookmarked-pages"><div class="devsite-devprofile-notch"></div>View your saved pages and finish your Google Developer Profile setup here.<div class="buttons"><button class="button button-white button-dismiss">Dismiss</button><a class="button button-white" href="https://developers.google.com/profile/u/112561679208765998003/saved-pages?authuser=0&amp;utm_source=developers.google.com">View</a></div></div></div><div class="gb_pa gb_Sd gb_Va gb_qa" id="gb"><div class="gb_Qd gb_Sa gb_Ed" ng-non-bindable="" data-ogsr-up="" style="padding:0;height:auto;display:block"><div class="gb_Me" style="display:block"><div class="gb_Nc"></div><div class="gb_Na gb_bd gb_gg gb_h gb_uf"><div class="gb_tf gb_Ra gb_gg gb_h"><a class="gb_C gb_Ma gb_h" aria-label="Google Account: Jose Navarro  
(githubapp94@gmail.com)" href="https://accounts.google.com/SignOutOptions?hl=en&amp;continue=https://developers.google.com/_d/profile/ogb%3Fauthuser%3D0" role="button" tabindex="0" aria-expanded="false"><div class="gb_Ua"><svg focusable="false" height="40px" version="1.1" viewBox="0 0 40 40" width="40px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="opacity:1.0"><path d="M4.02,28.27C2.73,25.8,2,22.98,2,20c0-2.87,0.68-5.59,1.88-8l-1.72-1.04C0.78,13.67,0,16.75,0,20c0,3.31,0.8,6.43,2.23,9.18L4.02,28.27z" fill="#F6AD01"></path><path d="M32.15,33.27C28.95,36.21,24.68,38,20,38c-6.95,0-12.98-3.95-15.99-9.73l-1.79,0.91C5.55,35.61,12.26,40,20,40c5.2,0,9.93-1.98,13.48-5.23L32.15,33.27z" fill="#249A41"></path><path d="M33.49,34.77C37.49,31.12,40,25.85,40,20c0-5.86-2.52-11.13-6.54-14.79l-1.37,1.46C35.72,9.97,38,14.72,38,20c0,5.25-2.26,9.98-5.85,13.27L33.49,34.77z" fill="#3174F1"></path><path d="M20,2c4.65,0,8.89,1.77,12.09,4.67l1.37-1.46C29.91,1.97,25.19,0,20,0l0,0C12.21,0,5.46,4.46,2.16,10.96L3.88,12C6.83,6.08,12.95,2,20,2" fill="#E92D18"></path></svg></div><img class="gb_Ca gbii" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/unnamed.png" srcset="https://lh3.googleusercontent.com/ogw/ADea4I5GJJym_MBUamVDF851X8V2ldVI5btPeWIxK9W9=s32-c-mo 1x, https://lh3.googleusercontent.com/ogw/ADea4I5GJJym_MBUamVDF851X8V2ldVI5btPeWIxK9W9=s64-c-mo 2x " alt="" aria-hidden="true" data-noaft=""></a><div class="gb_Za"></div><div class="gb_Xa"></div></div></div></div><div class="gb_0a gb_E gb_k gb_1a" aria-label="Account Information" aria-hidden="true"><div class="gb_9a"><div class="gb_ab"><img class="gb_Ha gbip gb_eb gb_hb" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://lh3.googleusercontent.com/ogw/ADea4I5GJJym_MBUamVDF851X8V2ldVI5btPeWIxK9W9=s83-c-mo" data-srcset="https://lh3.googleusercontent.com/ogw/ADea4I5GJJym_MBUamVDF851X8V2ldVI5btPeWIxK9W9=s83-c-mo 1x, https://lh3.googleusercontent.com/ogw/ADea4I5GJJym_MBUamVDF851X8V2ldVI5btPeWIxK9W9=s192-c-mo 2x " title="Profile" alt="" aria-hidden="true"><div class="gb_ec"><svg height="88" width="88" focusable="false" version="1.1" viewBox="0 0 108 108" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="opacity:1.0"><path d="M3,54c0-8.21,1.95-15.96,5.4-22.83l-2.62-1.32c-3.67,7.29-5.74,15.51-5.74,24.23 c0,9.01,2.22,17.49,6.12,24.96l2.66-1.4C5.11,70.56,3,62.53,3,54z" fill="#F6AD01"></path><path d="M90.22,94.16l-2.07-2.28C79.11,100.03,67.13,105,54,105c-19.64,0-36.67-11.1-45.19-27.37l-2.66,1.4 c8.53,16.34,25.17,27.76,44.58,28.93h6.6C69.95,107.21,81.4,102.12,90.22,94.16z" fill="#249A41"></path><path d="M108,52.89c-0.33-15.31-7.02-29.05-17.55-38.68l-2.01,2.17C98.61,25.71,105,39.11,105,54 c0,15.03-6.51,28.54-16.85,37.88l2.07,2.28c10.66-9.63,17.45-23.47,17.78-38.89V52.89z" fill="#3174F1"></path><path d="M8.43,31.11C16.81,14.44,34.07,3,54,3c13.28,0,25.36,5.08,34.44,13.39l2.01-2.17 C80.85,5.44,68.06,0.08,54.03,0.08C32.95,0.08,14.7,12.17,5.8,29.79L8.43,31.11z" fill="#E92D18"></path></svg></div><div class="gb_ib gb_eb"><a class="gb_jb gb_Lf gb_eb gb_Qf" aria-label="Change profile picture." href="https://myaccount.google.com/?utm_source=OGB" target="_blank"><svg class="gb_kb" enable-background="new 0 0 24 24" focusable="false" height="26" viewBox="0 0 24 24" width="18" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M20 5h-3.17L15 3H9L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 14H4V7h16v12zM12 9c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path></svg></a></div></div><div class="gb_bb"><div class="gb_lb gb_mb">Jose Navarro</div><div class="gb_nb">githubapp94@gmail.com</div><a class="gb_rb gb_Mf gbp1 gb_Je gb_3c" href="https://myaccount.google.com/?utm_source=OGB&amp;utm_medium=act" target="_blank">Manage your Google Account</a></div></div><div class="gb_Eb gb_Ib"><div class="gb_Sf gb_fc gb_Aa"><div class="gb_gc"></div></div><div class="gb_Pf gb_Mb gb_Aa" aria-hidden="true"><a class="gb_Lb gb_Vb" aria-hidden="true" href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0" target="_blank"><img class="gb_Xb gb_eb" src="data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" data-src="https://lh3.googleusercontent.com/ogw/ADea4I5GJJym_MBUamVDF851X8V2ldVI5btPeWIxK9W9=s48-c-mo" alt="" aria-hidden="true"><div class="gb_Ob"><div><div class="gb_4b">Default</div></div><div class="gb_0b">Jose Navarro</div><div class="gb_2b">githubapp94@gmail.com</div></div></a></div><div class="gb_yb" aria-hidden="true"><svg class="gb_zb" focusable="false" height="20" viewBox="0 0 20 20" width="20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M0 0h20v20H0V0z" fill="none"></path><path d="M6.18 7L10 10.82 13.82 7 15 8.17l-5 5-5-5z"></path></svg></div><a class="gb_6b gb_Aa gb_Pb" href="https://myaccount.google.com/brandaccounts?authuser=0&amp;continue=https://developers.google.com/_d/profile/ogb%3Fauthuser%3D0&amp;service=%3Fauthuser%3D%24authuser" aria-hidden="true"><div class="gb_7b"><svg focusable="false" height="20" viewBox="0 0 24 24" width="20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 2v10.79C16.52 14.37 13.23 14 12 14s-4.52.37-7 1.79V5h14zM5 19v-.77C6.74 16.66 10.32 16 12 16s5.26.66 7 2.23V19H5zm7-6c1.94 0 3.5-1.56 3.5-3.5S13.94 6 12 6 8.5 7.56 8.5 9.5 10.06 13 12 13zm0-5c.83 0 1.5.67 1.5 1.5S12.83 11 12 11s-1.5-.67-1.5-1.5S11.17 8 12 8z" fill="#5F6368"></path><path d="M0 0h24v24H0V0z" fill="none"></path></svg></div><div class="gb_9b gb_ac">All Brand accounts</div><svg class="gb_bc" focusable="false" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#5F6368"></path><path d="M0 0h24v24H0z" fill="none"></path></svg></a></div><div class="gb_Qb" tabindex="-1"><a class="gb_vb gb_If" href="https://accounts.google.com/AddSession?continue=&amp;ec=GAlAywI" target="_blank"><div class="gb_wb"><svg class="gb_xb" enable-background="new 0 0 24 24" focusable="false" height="20" viewBox="0 0 24 24" width="20" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"></path></svg></div><div class="gb_Ab">Add another account</div></a></div><div class="gb_Jf gb_Bb"><a class="gb_Cb gb_Nf gb_Vf gb_Je gb_3c" id="gb_71" href="https://accounts.google.com/Logout?continue=https://developers.google.com/&amp;service=ahsid&amp;ec=GAdAywI" target="_top">Sign out</a></div><div class="gb_Kf gb_sb"><a class="gb_tb gb_Hb" href="https://policies.google.com/privacy?hl=en" target="_blank">Privacy Policy</a><span class="gb_Oa" aria-hidden="true">•</span><a class="gb_tb gb_Fb" href="https://myaccount.google.com/termsofservice?hl=en" target="_blank">Terms of Service</a></div></div><div style="overflow: hidden; position: absolute; top: 0px; visibility: hidden; width: 328px; z-index: 991; height: 0px; margin-top: 57px; transition: height 0.3s ease-in-out 0s; right: 0px; margin-right: 4px;"></div></div></div></div></devsite-user>
           
        
      </div>
    </div>
  </div>



  <div class="devsite-collapsible-section
    " style="transform: translate3d(0px, 0px, 0px);">
    <div class="devsite-header-background">
      
        
          <div class="devsite-product-id-row">
            <div class="devsite-product-description-row">
              
                
                  
                  
                  <ul class="devsite-breadcrumb-list">
  
  <li class="devsite-breadcrumb-item
             ">
    
    
    
      
  <a href="https://developers.google.com/apps-script/overview?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Lower Header" data-value="1" track-type="globalNav" track-name="breadcrumb" track-metadata-position="1" track-metadata-eventdetail="">
    
        Automate tasks with Apps Script
      
  </a>
  
    
  </li>
  
</ul>
                
              
              
            </div>
            
          </div>
          
        
      
      
        <div class="devsite-doc-set-nav-row">
          
          
            
            
  <devsite-tabs class="lower-tabs" connected="">

    

  <nav class="devsite-tabs-wrapper" aria-label="Lower tabs">
      
        
          <tab>
            <a href="https://developers.google.com/apps-script/overview?authuser=0" class="gc-analytics-event " track-type="nav" track-name="guides" track-metadata-eventdetail="https://developers.google.com/apps-script/overview?authuser=0" track-metadata-position="nav - guides" track-metadata-module="primary nav" data-category="Site-Wide Custom Events" data-label="Tab: Guides">
  Guides
</a>

          </tab>
        
      
        
          <tab active="">
            <a href="https://developers.google.com/apps-script/reference?authuser=0" class="gc-analytics-event " track-type="nav" track-name="reference" track-metadata-eventdetail="https://developers.google.com/apps-script/reference?authuser=0" track-metadata-position="nav - reference" track-metadata-module="primary nav" aria-label="Reference, selected" data-category="Site-Wide Custom Events" data-label="Tab: Reference">
  Reference
</a>

          </tab>
        
      
        
          <tab>
            <a href="https://developers.google.com/apps-script/articles?authuser=0" class="gc-analytics-event " track-type="nav" track-name="samples" track-metadata-eventdetail="https://developers.google.com/apps-script/articles?authuser=0" track-metadata-position="nav - samples" track-metadata-module="primary nav" data-category="Site-Wide Custom Events" data-label="Tab: Samples">
  Samples
</a>

          </tab>
        
      
        
          <tab>
            <a href="https://developers.google.com/apps-script/support?authuser=0" class="gc-analytics-event " track-type="nav" track-name="support" track-metadata-eventdetail="https://developers.google.com/apps-script/support?authuser=0" track-metadata-position="nav - support" track-metadata-module="primary nav" data-category="Site-Wide Custom Events" data-label="Tab: Support">
  Support
</a>

          </tab>
        
      
    <tab overflow-tab="" hidden=""><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#" class="devsite-icon devsite-icon-arrow-drop-down">More</a><div class="devsite-tabs-overflow-menu" scrollbars="" hidden=""></div></tab></nav></devsite-tabs>

          
          
        </div>
      
    </div>
  </div>

</div>



  

  
</devsite-header>
      <div class="devsite-book-nav-bg" fixed=""></div><devsite-book-nav scrollbars="" role="menu" fixed="" style="top: 157px; max-height: 605px;">
        
          


























<nav class="devsite-book-nav devsite-nav nocontent" aria-label="Side menu" animatable="">
  <div class="devsite-mobile-header">
    <button type="button" id="devsite-close-nav" class="devsite-header-icon-button button-flat material-icons gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Close navigation" aria-label="Close navigation">
    </button>
    <div class="devsite-product-name-wrapper">

  
    
  
  <a href="https://developers.google.com/apps-script?authuser=0">
    
  <div class="devsite-product-logo-container" size="medium">
  
    <img class="devsite-product-logo" alt="Google Apps Script" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/apps_script_48dp.png" srcset="" sizes="64px" loading="lazy">
  
  </div>
  
  </a>
  

  


  
      <span class="devsite-product-name">
        
        
        <ul class="devsite-breadcrumb-list">
  
  <li class="devsite-breadcrumb-item
             devsite-has-google-wordmark">
    
    
    
      
      
        
  <a href="https://developers.google.com/apps-script?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Upper Header" data-value="1" track-type="globalNav" track-name="breadcrumb" track-metadata-position="1" track-metadata-eventdetail="Google Apps Script">
    
          <svg class="devsite-google-wordmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 148 48">
    <title>Google</title>
    <path class="devsite-google-wordmark-svg-path" d="M19.58,37.65c-9.87,0-18.17-8.04-18.17-17.91c0-9.87,8.3-17.91,18.17-17.91c5.46,0,9.35,2.14,12.27,4.94l-3.45,3.45c-2.1-1.97-4.93-3.49-8.82-3.49c-7.21,0-12.84,5.81-12.84,13.02c0,7.21,5.64,13.02,12.84,13.02c4.67,0,7.34-1.88,9.04-3.58c1.4-1.4,2.32-3.41,2.66-6.16H19.58v-4.89h16.47c0.18,0.87,0.26,1.92,0.26,3.06c0,3.67-1.01,8.21-4.24,11.44C28.93,35.9,24.91,37.65,19.58,37.65z M61.78,26.12c0,6.64-5.1,11.53-11.36,11.53s-11.36-4.89-11.36-11.53c0-6.68,5.1-11.53,11.36-11.53S61.78,19.43,61.78,26.12z M56.8,26.12c0-4.15-2.96-6.99-6.39-6.99c-3.43,0-6.39,2.84-6.39,6.99c0,4.11,2.96,6.99,6.39,6.99C53.84,33.11,56.8,30.22,56.8,26.12z M87.25,26.12c0,6.64-5.1,11.53-11.36,11.53c-6.26,0-11.36-4.89-11.36-11.53c0-6.68,5.1-11.53,11.36-11.53C82.15,14.59,87.25,19.43,87.25,26.12zM82.28,26.12c0-4.15-2.96-6.99-6.39-6.99c-3.43,0-6.39,2.84-6.39,6.99c0,4.11,2.96,6.99,6.39,6.99C79.32,33.11,82.28,30.22,82.28,26.12z M112.09,15.29v20.7c0,8.52-5.02,12.01-10.96,12.01c-5.59,0-8.95-3.76-10.22-6.81l4.41-1.83c0.79,1.88,2.71,4.1,5.81,4.1c3.8,0,6.16-2.36,6.16-6.77v-1.66h-0.18c-1.14,1.4-3.32,2.62-6.07,2.62c-5.76,0-11.05-5.02-11.05-11.49c0-6.51,5.28-11.57,11.05-11.57c2.75,0,4.93,1.22,6.07,2.58h0.18v-1.88H112.09z M107.64,26.16c0-4.06-2.71-7.03-6.16-7.03c-3.49,0-6.42,2.97-6.42,7.03c0,4.02,2.93,6.94,6.42,6.94C104.93,33.11,107.64,30.18,107.64,26.16z M120.97,3.06v33.89h-5.07V3.06H120.97z M140.89,29.92l3.93,2.62c-1.27,1.88-4.32,5.11-9.61,5.11c-6.55,0-11.28-5.07-11.28-11.53c0-6.86,4.77-11.53,10.71-11.53c5.98,0,8.91,4.76,9.87,7.34l0.52,1.31l-15.42,6.38c1.18,2.31,3.01,3.49,5.59,3.49C137.79,33.11,139.58,31.84,140.89,29.92zM128.79,25.77l10.31-4.28c-0.57-1.44-2.27-2.45-4.28-2.45C132.24,19.04,128.66,21.31,128.79,25.77z"></path>
  </svg>Apps Script
        
  </a>
  
      
    
  </li>
  
</ul>
      </span>
    

</div>
  </div>

  <div class="devsite-book-nav-wrapper">
    <div class="devsite-mobile-nav-top">
      
        <ul class="devsite-nav-list">
          
            <li class="devsite-nav-item">
              
  
  <a href="https://developers.google.com/apps-script/overview" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Responsive Tab: Learn Apps Script" track-type="globalNav" track-metadata-eventdetail="globalMenu" track-metadata-position="nav" track-name="learnAppsScript">
  
    <span class="devsite-nav-text" tooltip="">
      Learn Apps Script
   </span>
    
  
  </a>
  

  
              
                <ul class="devsite-nav-responsive-tabs">
                  
                    
                    
                    
                    <li class="devsite-nav-item">
                      
  
  <a href="https://developers.google.com/apps-script/overview" class="devsite-nav-title gc-analytics-event
              devsite-nav-has-children
              " data-category="Site-Wide Custom Events" data-label="Responsive Tab: Guides" track-type="globalNav" track-metadata-eventdetail="globalMenu" track-metadata-position="nav" track-name="guides">
  
    <span class="devsite-nav-text" tooltip="">
      Guides
   </span>
    
    <span class="devsite-nav-icon material-icons" data-icon="forward">
    </span>
    
  
  </a>
  

  
                    </li>
                  
                    
                    
                    
                    <li class="devsite-nav-item">
                      
  
  <a href="https://developers.google.com/apps-script/reference" class="devsite-nav-title gc-analytics-event devsite-nav-has-children" data-category="Site-Wide Custom Events" data-label="Responsive Tab: Reference" track-type="globalNav" track-metadata-eventdetail="globalMenu" track-metadata-position="nav" track-name="reference">
  
    <span class="devsite-nav-text" tooltip="" menu="_book">
      Reference
   </span>
    
    <span class="devsite-nav-icon material-icons" data-icon="forward" menu="_book">
    </span>
    
  
  </a>
  

  
                    </li>
                  
                    
                    
                    
                    <li class="devsite-nav-item">
                      
  
  <a href="https://developers.google.com/apps-script/articles" class="devsite-nav-title gc-analytics-event
              devsite-nav-has-children
              " data-category="Site-Wide Custom Events" data-label="Responsive Tab: Samples" track-type="globalNav" track-metadata-eventdetail="globalMenu" track-metadata-position="nav" track-name="samples">
  
    <span class="devsite-nav-text" tooltip="">
      Samples
   </span>
    
    <span class="devsite-nav-icon material-icons" data-icon="forward">
    </span>
    
  
  </a>
  

  
                    </li>
                  
                    
                    
                    
                    <li class="devsite-nav-item">
                      
  
  <a href="https://developers.google.com/apps-script/support" class="devsite-nav-title gc-analytics-event
              devsite-nav-has-children
              " data-category="Site-Wide Custom Events" data-label="Responsive Tab: Support" track-type="globalNav" track-metadata-eventdetail="globalMenu" track-metadata-position="nav" track-name="support">
  
    <span class="devsite-nav-text" tooltip="">
      Support
   </span>
    
    <span class="devsite-nav-icon material-icons" data-icon="forward">
    </span>
    
  
  </a>
  

  
                    </li>
                  
                </ul>
              
            </li>
          
            <li class="devsite-nav-item">
              
  
  <a href="https://developers.google.com/apps-script/add-ons/overview" class="devsite-nav-title gc-analytics-event
              
              " data-category="Site-Wide Custom Events" data-label="Responsive Tab: Build add-ons" track-type="globalNav" track-metadata-eventdetail="globalMenu" track-metadata-position="nav" track-name="buildAddOns">
  
    <span class="devsite-nav-text" tooltip="">
      Build add-ons
   </span>
    
  
  </a>
  

  
              
            </li>
          
            <li class="devsite-nav-item">
              
  
  <a href="https://developers.google.com/apps-script/api/concepts" class="devsite-nav-title gc-analytics-event
              
              " data-category="Site-Wide Custom Events" data-label="Responsive Tab: Use the REST API" track-type="globalNav" track-metadata-eventdetail="globalMenu" track-metadata-position="nav" track-name="useTheRestApi">
  
    <span class="devsite-nav-text" tooltip="">
      Use the REST API
   </span>
    
  
  </a>
  

  
              
            </li>
          
          
          
        </ul>
      
    </div>
    
      <div class="devsite-mobile-nav-bottom" role="navigation">
        
          
          <ul class="devsite-nav-list" menu="_book">
            <li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Google Workspace services</span></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav connected="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="true"><span class="devsite-nav-text" tooltip="">Admin Console</span></div><ul class="devsite-nav-section" style=""><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory" class="devsite-nav-title devsite-nav-active"><span class="devsite-nav-text" tooltip="">Directory API</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-license-manager" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Enterprise License Manager API</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-groups-migration" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Groups Migration API</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-groups-settings" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Groups Settings API</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-reseller" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Reseller API</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-reports" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Reports API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Calendar</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/calendar-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CalendarApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/calendar" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Calendar</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/calendar-event" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CalendarEvent</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/calendar-event-series" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CalendarEventSeries</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/event-guest" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EventGuest</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/event-recurrence" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EventRecurrence</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/recurrence-rule" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RecurrenceRule</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/color" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Color</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/event-color" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EventColor</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/guest-status" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GuestStatus</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/calendar/visibility" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Visibility</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/calendar" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Calendar API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Docs</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/document-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DocumentApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/body" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Body</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/bookmark" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Bookmark</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/container-element" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ContainerElement</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/date" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Date</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/document" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Document</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/equation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Equation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/equation-function" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EquationFunction</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/equation-function-argument-separator" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EquationFunctionArgumentSeparator</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/equation-symbol" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EquationSymbol</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/footer-section" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FooterSection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/footnote" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Footnote</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/footnote-section" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FootnoteSection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/header-section" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">HeaderSection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/horizontal-rule" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">HorizontalRule</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/inline-drawing" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">InlineDrawing</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/inline-image" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">InlineImage</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/list-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ListItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/named-range" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">NamedRange</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/page-break" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageBreak</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/paragraph" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Paragraph</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/person" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Person</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/position" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Position</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/positioned-image" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PositionedImage</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/range" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Range</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/range-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RangeBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/range-element" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RangeElement</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/rich-link" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RichLink</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/table" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Table</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/table-cell" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TableCell</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/table-of-contents" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TableOfContents</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/table-row" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TableRow</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/text" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Text</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/unsupported-element" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">UnsupportedElement</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Interfaces</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/element" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Element</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/attribute" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Attribute</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/element-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ElementType</span></a></li><li class="devsite-nav-item
           devsite-nav-deprecated"><a href="https://developers.google.com/apps-script/reference/document/font-family" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FontFamily</span><span class="devsite-nav-icon material-icons" data-icon="deprecated" data-title="Deprecated" aria-hidden="true"></span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/glyph-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GlyphType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/horizontal-alignment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">HorizontalAlignment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/paragraph-heading" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ParagraphHeading</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/positioned-layout" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PositionedLayout</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/text-alignment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextAlignment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/document/vertical-alignment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">VerticalAlignment</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/docs" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Docs API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Drive</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive/drive-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DriveApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive/file" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">File</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive/file-iterator" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FileIterator</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive/folder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Folder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive/folder-iterator" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FolderIterator</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive/user" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">User</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive/access" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Access</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/drive/permission" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Permission</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/drive" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Drive API</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/drive-activity" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Drive Activity API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Forms</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/form-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FormApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/checkbox-grid-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CheckboxGridItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/checkbox-grid-validation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CheckboxGridValidation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/checkbox-grid-validation-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CheckboxGridValidationBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/checkbox-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CheckboxItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/checkbox-validation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CheckboxValidation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/checkbox-validation-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CheckboxValidationBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/choice" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Choice</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/date-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DateItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/date-time-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DateTimeItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/duration-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DurationItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/form" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Form</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/form-response" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FormResponse</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/grid-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GridItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/grid-validation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GridValidation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/grid-validation-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GridValidationBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/image-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ImageItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/item-response" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ItemResponse</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/list-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ListItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/multiple-choice-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">MultipleChoiceItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/page-break-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageBreakItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/paragraph-text-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ParagraphTextItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/paragraph-text-validation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ParagraphTextValidation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/paragraph-text-validation-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ParagraphTextValidationBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/quiz-feedback" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">QuizFeedback</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/quiz-feedback-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">QuizFeedbackBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/scale-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ScaleItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/section-header-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SectionHeaderItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/text-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/text-validation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextValidation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/text-validation-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextValidationBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/time-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TimeItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/video-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">VideoItem</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Interfaces</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Item</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/alignment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Alignment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/destination-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DestinationType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/feedback-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FeedbackType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/item-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ItemType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/forms/page-navigation-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageNavigationType</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Gmail</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/gmail" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/gmail/gmail-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GmailApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/gmail/gmail-attachment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GmailAttachment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/gmail/gmail-draft" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GmailDraft</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/gmail/gmail-label" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GmailLabel</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/gmail/gmail-message" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GmailMessage</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/gmail/gmail-thread" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GmailThread</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/gmail" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Gmail API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Sheets</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SpreadsheetApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/banding" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Banding</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/big-query-data-source-spec" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BigQueryDataSourceSpec</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/big-query-data-source-spec-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BigQueryDataSourceSpecBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/boolean-condition" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BooleanCondition</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/color" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Color</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/color-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ColorBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/conditional-format-rule" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ConditionalFormatRule</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/conditional-format-rule-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ConditionalFormatRuleBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/container-info" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ContainerInfo</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-execution-status" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataExecutionStatus</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSource</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-chart" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceChart</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-column" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceColumn</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-formula" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceFormula</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-parameter" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceParameter</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-pivot-table" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourcePivotTable</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-refresh-schedule" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceRefreshSchedule</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-refresh-schedule-frequency" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceRefreshScheduleFrequency</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-sheet" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceSheet</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-sheet-filter" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceSheetFilter</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-spec" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceSpec</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-spec-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceSpecBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-table" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceTable</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-table-column" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceTableColumn</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-table-filter" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceTableFilter</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-validation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataValidation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-validation-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataValidationBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/date-time-grouping-rule" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DateTimeGroupingRule</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DeveloperMetadata</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata-finder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DeveloperMetadataFinder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata-location" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DeveloperMetadataLocation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/drawing" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Drawing</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-area-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedAreaChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-bar-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedBarChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-chart" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedChart</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-column-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedColumnChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-combo-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedComboChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-histogram-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedHistogramChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-line-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedLineChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-pie-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedPieChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-scatter-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedScatterChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/embedded-table-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmbeddedTableChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/filter" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Filter</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/filter-criteria" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FilterCriteria</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/filter-criteria-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FilterCriteriaBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/gradient-condition" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GradientCondition</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/group" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Group</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/named-range" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">NamedRange</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/over-grid-image" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">OverGridImage</span></a></li><li class="devsite-nav-item
           devsite-nav-deprecated"><a href="https://developers.google.com/apps-script/reference/spreadsheet/page-protection" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageProtection</span><span class="devsite-nav-icon material-icons" data-icon="deprecated" data-title="Deprecated" aria-hidden="true"></span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/pivot-filter" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PivotFilter</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/pivot-group" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PivotGroup</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/pivot-group-limit" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PivotGroupLimit</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/pivot-table" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PivotTable</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/pivot-value" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PivotValue</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/protection" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Protection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/range" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Range</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/range-list" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RangeList</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RichTextValue</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/rich-text-value-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RichTextValueBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/selection" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Selection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Sheet</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/slicer" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Slicer</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/sort-spec" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SortSpec</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Spreadsheet</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-theme" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SpreadsheetTheme</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/text-finder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextFinder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/text-rotation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextRotation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/text-style-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextStyleBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/theme-color" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ThemeColor</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/auto-fill-series" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AutoFillSeries</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/banding-theme" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BandingTheme</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/boolean-criteria" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BooleanCriteria</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/border-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BorderStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/copy-paste-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CopyPasteType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-execution-error-code" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataExecutionErrorCode</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-execution-state" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataExecutionState</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-parameter-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceParameterType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-refresh-scope" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceRefreshScope</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-source-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataSourceType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/data-validation-criteria" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataValidationCriteria</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/date-time-grouping-rule-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DateTimeGroupingRuleType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata-location-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DeveloperMetadataLocationType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/developer-metadata-visibility" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DeveloperMetadataVisibility</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/dimension" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Dimension</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/direction" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Direction</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/frequency-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FrequencyType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/group-control-toggle-position" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GroupControlTogglePosition</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/interpolation-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">InterpolationType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/pivot-table-summarize-function" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PivotTableSummarizeFunction</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/pivot-value-display-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PivotValueDisplayType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/protection-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ProtectionType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/recalculation-interval" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RecalculationInterval</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/relative-date" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RelativeDate</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/sheet-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SheetType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/sort-order" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SortOrder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/text-direction" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextDirection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/text-to-columns-delimiter" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextToColumnsDelimiter</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/theme-color-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ThemeColorType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/spreadsheet/wrap-strategy" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">WrapStrategy</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/sheets" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Sheets API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Slides</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/slides-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SlidesApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/affine-transform" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AffineTransform</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/affine-transform-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AffineTransformBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/auto-text" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AutoText</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/autofit" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Autofit</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/border" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Border</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/color" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Color</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/color-scheme" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ColorScheme</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/connection-site" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ConnectionSite</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/fill" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Fill</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/group" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Group</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/image" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Image</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/layout" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Layout</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/line" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Line</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/line-fill" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LineFill</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/link" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Link</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/list" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">List</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/list-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ListStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/master" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Master</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/notes-master" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">NotesMaster</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/notes-page" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">NotesPage</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/page" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Page</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/page-background" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageBackground</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/page-element" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageElement</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/page-element-range" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageElementRange</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/page-range" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageRange</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/paragraph" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Paragraph</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/paragraph-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ParagraphStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/picture-fill" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PictureFill</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/point" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Point</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/presentation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Presentation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/selection" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Selection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/shape" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Shape</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/sheets-chart" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SheetsChart</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/slide" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Slide</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/solid-fill" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SolidFill</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/table" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Table</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/table-cell" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TableCell</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/table-cell-range" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TableCellRange</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/table-column" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TableColumn</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/table-row" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TableRow</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/text-range" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextRange</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/text-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/theme-color" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ThemeColor</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/video" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Video</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/word-art" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">WordArt</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/alignment-position" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AlignmentPosition</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/arrow-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ArrowStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/auto-text-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AutoTextType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/autofit-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AutofitType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/cell-merge-state" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CellMergeState</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/content-alignment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ContentAlignment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/dash-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DashStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/fill-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FillType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/line-category" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LineCategory</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/line-fill-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LineFillType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/line-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LineType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/link-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LinkType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/list-preset" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ListPreset</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/page-background-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageBackgroundType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/page-element-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageElementType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/page-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/paragraph-alignment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ParagraphAlignment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/placeholder-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PlaceholderType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/predefined-layout" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PredefinedLayout</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/selection-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SelectionType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/shape-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ShapeType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/sheets-chart-embed-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SheetsChartEmbedType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/slide-linking-mode" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SlideLinkingMode</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/slide-position" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SlidePosition</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/spacing-mode" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SpacingMode</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/text-baseline-offset" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextBaselineOffset</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/text-direction" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextDirection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/theme-color-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ThemeColorType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/slides/video-source-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">VideoSourceType</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/slides" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Slides API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">More.<wbr>.<wbr>.<wbr></span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Classroom</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/classroom" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Classroom API</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Contacts</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/contacts-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ContactsApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/address-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AddressField</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/company-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CompanyField</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/contact" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Contact</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/contact-group" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ContactGroup</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/custom-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CustomField</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/date-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DateField</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/email-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EmailField</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/im-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">IMField</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/phone-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PhoneField</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/url-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">UrlField</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/extended-field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ExtendedField</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Field</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/gender" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Gender</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/priority" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Priority</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/contacts/sensitivity" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Sensitivity</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/people" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">People API</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Groups</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/groups" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/groups/groups-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GroupsApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/groups/group" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Group</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/groups/role" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Role</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Sites (Classic)</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/sites-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SitesApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/attachment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Attachment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/column" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Column</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/comment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Comment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/list-item" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ListItem</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/page" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Page</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/site" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Site</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/attachment-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AttachmentType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/sites/page-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PageType</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Tasks</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/tasks" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Tasks API</span></a></li></ul></devsite-expandable-nav></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Other Google services</span></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Google Analytics</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/analytics" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Management and Reporting APIs</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/analyticsdata" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Analytics Data API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Google Maps</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/maps" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Maps</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/direction-finder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DirectionFinder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/direction-finder-enums" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DirectionFinderEnums</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/elevation-sampler" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ElevationSampler</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/geocoder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Geocoder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/static-map" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">StaticMap</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/static-map-enums" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">StaticMapEnums</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/avoid" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Avoid</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/color" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Color</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/format" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Format</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/marker-size" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">MarkerSize</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/mode" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Mode</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/maps/type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Type</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Google Translate</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/language" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/language/language-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LanguageApp</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">YouTube</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/youtube" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">YouTube Data API</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/youtube-analytics" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">YouTube Analytics API</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/youtube-content-id" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">YouTube Content ID API</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">More...</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Google Ads &amp; Merchant Center</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">AdSense</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/adsense" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AdSense Management API</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">DoubleClick Campaigns</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/doubleclick-campaigns" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DCM/DFA Reporting and Trafficking API</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Shopping Content</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/shopping-content" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Google Content API for Shopping</span></a></li></ul></devsite-expandable-nav></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Google Data Studio</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/data-studio-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataStudioApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/big-query-config" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BigQueryConfig</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/checkbox" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Checkbox</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/community-connector" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CommunityConnector</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/config" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Config</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/debug-error" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DebugError</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/field" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Field</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/fields" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Fields</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/get-auth-type-response" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GetAuthTypeResponse</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/get-data-response" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GetDataResponse</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/get-schema-response" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">GetSchemaResponse</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/info" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Info</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/option-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">OptionBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/select-multiple" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SelectMultiple</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/select-single" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SelectSingle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/set-credentials-response" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SetCredentialsResponse</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/text-area" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextArea</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/text-input" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextInput</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/user-error" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">UserError</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/aggregation-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AggregationType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/auth-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AuthType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/big-query-parameter-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BigQueryParameterType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/data-studio/field-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FieldType</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Google Glass</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/mirror" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Google Mirror API</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Google Tables</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/tables" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Tables API</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Google Tag Manager</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/tag-manager" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Tag Manager API</span></a></li></ul></devsite-expandable-nav></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Utility services</span></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">API &amp; database connections</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">BigQuery</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Advanced services</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/bigquery" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BigQuery API</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">JDBC</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Jdbc</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-array" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcArray</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-blob" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcBlob</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-callable-statement" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcCallableStatement</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-clob" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcClob</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-connection" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcConnection</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-database-meta-data" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcDatabaseMetaData</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-date" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcDate</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-parameter-meta-data" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcParameterMetaData</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-prepared-statement" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcPreparedStatement</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-ref" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcRef</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-result-set" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcResultSet</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-result-set-meta-data" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcResultSetMetaData</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-row-id" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcRowId</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-sqlxml" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcSQLXML</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-savepoint" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcSavepoint</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-statement" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcStatement</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-struct" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcStruct</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-time" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcTime</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/jdbc/jdbc-timestamp" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">JdbcTimestamp</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">URL Fetch</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/url-fetch" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/url-fetch/url-fetch-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">UrlFetchApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/url-fetch/http-response" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">HTTPResponse</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/migration/oauth-config" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">OAuthConfig Migration</span></a></li></ul></devsite-expandable-nav></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Data usability &amp; optimization</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Optimization</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/optimization" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/optimization/linear-optimization-service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LinearOptimizationService</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/optimization/linear-optimization-constraint" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LinearOptimizationConstraint</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/optimization/linear-optimization-engine" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LinearOptimizationEngine</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/optimization/linear-optimization-solution" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LinearOptimizationSolution</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/optimization/status" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Status</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/optimization/variable-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">VariableType</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Utilities</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/utilities" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/utilities/utilities" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Utilities</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/utilities/charset" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Charset</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/utilities/digest-algorithm" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DigestAlgorithm</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/utilities/mac-algorithm" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">MacAlgorithm</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/utilities/rsa-algorithm" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RsaAlgorithm</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">XML</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/xml-service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">XmlService</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/attribute" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Attribute</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/cdata" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Cdata</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/comment" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Comment</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/doc-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DocType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/document" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Document</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/element" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Element</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/entity-ref" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EntityRef</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/format" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Format</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/namespace" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Namespace</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/processing-instruction" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ProcessingInstruction</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/text" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Text</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Interfaces</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/content" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Content</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/xml-service/content-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ContentType</span></a></li></ul></devsite-expandable-nav></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">HTML &amp; content</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Charts</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/charts" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Charts</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/area-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AreaChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/bar-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BarChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/chart" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Chart</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/chart-options" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ChartOptions</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/column-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ColumnChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/data-table" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataTable</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/data-table-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataTableBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/data-view-definition" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataViewDefinition</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/data-view-definition-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataViewDefinitionBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/line-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LineChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/number-range-filter-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">NumberRangeFilterBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/pie-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PieChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/scatter-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ScatterChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/string-filter-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">StringFilterBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/table-chart-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TableChartBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/text-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/text-style-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextStyleBuilder</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Interfaces</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/data-table-source" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DataTableSource</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/chart-hidden-dimension-strategy" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ChartHiddenDimensionStrategy</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/chart-merge-strategy" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ChartMergeStrategy</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/chart-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ChartType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/column-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ColumnType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/curve-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CurveStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/match-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">MatchType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/orientation" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Orientation</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/picker-values-layout" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PickerValuesLayout</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/point-style" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PointStyle</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/charts/position" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Position</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Content</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/content" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/content/content-service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ContentService</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/content/text-output" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TextOutput</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/content/mime-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">MimeType</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">HTML</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/html" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/guides/html/reference/history" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">google.script.history (client-side)</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/guides/html/reference/host" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">google.script.host (client-side)</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/guides/html/reference/run" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">google.script.run (client-side)</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/guides/html/reference/url" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">google.script.url (client-side)</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/html/html-service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">HtmlService</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/html/html-output" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">HtmlOutput</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/html/html-output-meta-tag" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">HtmlOutputMetaTag</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/html/html-template" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">HtmlTemplate</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/html/sandbox-mode" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SandboxMode</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/html/x-frame-options-mode" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">XFrameOptionsMode</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Mail</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/mail" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/mail/mail-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">MailApp</span></a></li></ul></devsite-expandable-nav></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Script execution &amp; information</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Base</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/browser" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Browser</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/logger" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Logger</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/mime-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">MimeType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/session" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Session</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/console" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">console</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/blob" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Blob</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/menu" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Menu</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/prompt-response" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PromptResponse</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/rgb-color" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">RgbColor</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/ui" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Ui</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/user" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">User</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Interfaces</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/blob-source" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">BlobSource</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/button" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Button</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/button-set" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ButtonSet</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/color-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ColorType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/month" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Month</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/base/weekday" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Weekday</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Cache</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/cache" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/cache/cache-service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CacheService</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/cache/cache" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Cache</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Lock</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/lock" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/lock/lock-service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">LockService</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/lock/lock" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Lock</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Properties</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/properties" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/properties/properties-service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">PropertiesService</span></a></li><li class="devsite-nav-item
           devsite-nav-deprecated"><a href="https://developers.google.com/apps-script/reference/properties/script-properties" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ScriptProperties</span><span class="devsite-nav-icon material-icons" data-icon="deprecated" data-title="Deprecated" aria-hidden="true"></span></a></li><li class="devsite-nav-item
           devsite-nav-deprecated"><a href="https://developers.google.com/apps-script/reference/properties/user-properties" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">UserProperties</span><span class="devsite-nav-icon material-icons" data-icon="deprecated" data-title="Deprecated" aria-hidden="true"></span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/properties/properties" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Properties</span></a></li></ul></devsite-expandable-nav></li><li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Script</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/script-app" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ScriptApp</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Classes</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/authorization-info" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AuthorizationInfo</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/calendar-trigger-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">CalendarTriggerBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/clock-trigger-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">ClockTriggerBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/document-trigger-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">DocumentTriggerBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/form-trigger-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">FormTriggerBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/service" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Service</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/spreadsheet-trigger-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">SpreadsheetTriggerBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/state-token-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">StateTokenBuilder</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/trigger" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Trigger</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/trigger-builder" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TriggerBuilder</span></a></li><li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Enums</span></div></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/auth-mode" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AuthMode</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/authorization-status" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">AuthorizationStatus</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/event-type" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">EventType</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/installation-source" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">InstallationSource</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/reference/script/trigger-source" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">TriggerSource</span></a></li></ul></devsite-expandable-nav></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Script project resources</span></div></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Automation triggers and events</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/guides/triggers" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Simple triggers</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/guides/triggers/installable" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Installable triggers</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/guides/triggers/events" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Event objects</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item
           devsite-nav-expandable"><devsite-expandable-nav collapsed="" connected="" animatable="">
    <a class="devsite-nav-toggle" aria-hidden="true"></a><div class="devsite-nav-title devsite-nav-title-no-path" tabindex="0" role="button" aria-expanded="false"><span class="devsite-nav-text" tooltip="">Manifest</span></div><ul class="devsite-nav-section"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/manifest" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Overview</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/manifest/dependencies" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Libraries &amp; advanced services</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/manifest/web-app-api-executable" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Web apps and API executables</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/manifest/sheets" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Sheets macros</span></a></li><li class="devsite-nav-item
           devsite-nav-external"><a href="https://developers.google.com/apps-script/manifest/addons" class="devsite-nav-title" target="_blank"><span class="devsite-nav-text" tooltip="">Google Workspace Add-ons</span><span class="devsite-nav-icon material-icons" data-icon="external" data-title="External" aria-hidden="true"></span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/manifest/allowlist-url" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Allowlist URLs</span></a></li></ul></devsite-expandable-nav></li>

  <li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/guides/services/quotas" class="devsite-nav-title"><span class="devsite-nav-text" tooltip="">Quotas &amp; limits</span></a></li>

  <li class="devsite-nav-item
           devsite-nav-heading"><div class="devsite-nav-title devsite-nav-title-no-path"><span class="devsite-nav-text" tooltip="">Add-on resources</span></div></li>

  <li class="devsite-nav-item
           devsite-nav-external"><a href="https://developers.google.com/apps-script/add-ons/reference/overview" class="devsite-nav-title" target="_blank"><span class="devsite-nav-text" tooltip="">Add-ons reference docs</span><span class="devsite-nav-icon material-icons" data-icon="external" data-title="External" aria-hidden="true"></span></a></li>
          </ul>
        
        
          
    
  
    
  
    
  
        
        
          
    
  
    
  
    
  
    
  
        
      </div>
    
  </div>
</nav>
        
      </devsite-book-nav><div class="devsite-book-nav-blur" fixed=""></div><button class="devsite-book-nav-toggle" aria-haspopup="menu" fixed="" aria-label="Hide side navigation" data-title="Hide side navigation" aria-expanded="true"><span class="material-icons devsite-book-nav-toggle-icon"></span></button>
      <section id="gc-wrapper" style="margin-top: 157px;">
        <main role="main" class="devsite-main-content" has-book-nav="" has-sidebar="">
          
          <div class="devsite-sidebar" fixed="">
            <div class="sidebar-content">
              <devsite-toc class="devsite-nav devsite-toc" role="navigation" aria-label="On this page" depth="2" scrollbars="" visible=""><ul class="devsite-nav-list"><li class="devsite-nav-item devsite-nav-heading devsite-toc-toggle" role="heading" aria-level="2"><span class="devsite-nav-title"><span class="devsite-nav-text">On this page</span></span></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#reference" class="devsite-nav-title gc-analytics-event devsite-nav-active" data-category="Site-Wide Custom Events" data-action="click" data-label="Right nav" data-value="0" track-type="navigation" track-name="rightNav" track-metadata-position="0" track-metadata-link-destination="#reference"><span class="devsite-nav-text" tooltip="">Reference</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#sample_code" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Right nav" data-value="1" track-type="navigation" track-name="rightNav" track-metadata-position="1" track-metadata-link-destination="#sample_code"><span class="devsite-nav-text" tooltip="">Sample code</span></a><ul class="devsite-nav-list"><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#list_all_users" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Right nav" data-value="1.0" track-type="navigation" track-name="rightNav" track-metadata-position="1.0" track-metadata-link-destination="#list_all_users"><span class="devsite-nav-text" tooltip="">List all users</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#get_user" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Right nav" data-value="1.1" track-type="navigation" track-name="rightNav" track-metadata-position="1.1" track-metadata-link-destination="#get_user"><span class="devsite-nav-text" tooltip="">Get user</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#add_user" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Right nav" data-value="1.2" track-type="navigation" track-name="rightNav" track-metadata-position="1.2" track-metadata-link-destination="#add_user"><span class="devsite-nav-text" tooltip="">Add user</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#create_alias" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Right nav" data-value="1.3" track-type="navigation" track-name="rightNav" track-metadata-position="1.3" track-metadata-link-destination="#create_alias"><span class="devsite-nav-text" tooltip="">Create alias</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#list_all_groups" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Right nav" data-value="1.4" track-type="navigation" track-name="rightNav" track-metadata-position="1.4" track-metadata-link-destination="#list_all_groups"><span class="devsite-nav-text" tooltip="">List all groups</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#add_group_member" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Right nav" data-value="1.5" track-type="navigation" track-name="rightNav" track-metadata-position="1.5" track-metadata-link-destination="#add_group_member"><span class="devsite-nav-text" tooltip="">Add group member</span></a></li></ul></li></ul></devsite-toc>
              <devsite-recommendations-sidebar class="nocontent devsite-nav">
              </devsite-recommendations-sidebar>
            </div>
          </div>
          <devsite-content>
            
              

















<article class="devsite-article" has-bookmark="">
  
  
  

  <div class="devsite-article-meta nocontent" role="navigation">
    
    
    <ul class="devsite-breadcrumb-list" aria-label="Breadcrumb">
  
  <li class="devsite-breadcrumb-item
             ">
    
    
    
      
  <a href="https://developers.google.com/?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Breadcrumbs" data-value="1" track-type="globalNav" track-name="breadcrumb" track-metadata-position="1" track-metadata-eventdetail="">
    
        Home
      
  </a>
  
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
  <a href="https://developers.google.com/products?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Breadcrumbs" data-value="2" track-type="globalNav" track-name="breadcrumb" track-metadata-position="2" track-metadata-eventdetail="">
    
        Products
      
  </a>
  
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
  <a href="https://developers.google.com/workspace?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Breadcrumbs" data-value="3" track-type="globalNav" track-name="breadcrumb" track-metadata-position="3" track-metadata-eventdetail="Google Workspace for Developers">
    
        Google Workspace for Developers
      
  </a>
  
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
  <a href="https://developers.google.com/apps-script?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Breadcrumbs" data-value="4" track-type="globalNav" track-name="breadcrumb" track-metadata-position="4" track-metadata-eventdetail="Google Apps Script">
    
        Apps Script
      
  </a>
  
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
  <a href="https://developers.google.com/apps-script/overview?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Breadcrumbs" data-value="5" track-type="globalNav" track-name="breadcrumb" track-metadata-position="5" track-metadata-eventdetail="">
    
        Learn Apps Script
      
  </a>
  
    
  </li>
  
  <li class="devsite-breadcrumb-item
             ">
    
      
      <div class="devsite-breadcrumb-guillemet material-icons" aria-hidden="true"></div>
    
    
    
      
  <a href="https://developers.google.com/apps-script/reference?authuser=0" class="devsite-breadcrumb-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Breadcrumbs" data-value="6" track-type="globalNav" track-name="breadcrumb" track-metadata-position="6" track-metadata-eventdetail="">
    
        Reference
      
  </a>
  
    
  </li>
  
</ul>
    
      
    <devsite-thumb-rating position="header"><div class="devsite-thumb-rating" role="form" aria-labelledby="devsite-thumb-label-header" tabindex="0"><div class="devsite-thumb-label" id="devsite-thumb-label-header">Was this helpful?</div><div class="devsite-thumbs"><button class="devsite-thumb devsite-thumb-up" data-title="Helpful" aria-label="Helpful"><svg class="devsite-thumb-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21,7h-6.31l0.95-4.57l0.03-0.32c0-0.41-0.17-0.79-0.44-1.06L14.17,0c0,0-7.09,6.85-7.17,7H2v13h16 c0.83,0,1.54-0.5,1.84-1.22l3.02-7.05C22.95,11.5,23,11.26,23,11V9C23,7.9,22.1,7,21,7z M7,18H4V9h3V18z M21,11l-3,7H9V8l4.34-4.34 L12,9h9V11z"></path></svg></button><button class="devsite-thumb devsite-thumb-down" data-title="Not helpful" aria-label="Not helpful"><svg class="devsite-thumb-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3,17h6.31l-0.95,4.57l-0.03,0.32c0,0.41,0.17,0.79,0.44,1.06L9.83,24c0,0,7.09-6.85,7.17-7h5V4H6 C5.17,4,4.46,4.5,4.16,5.22l-3.02,7.05C1.05,12.5,1,12.74,1,13v2C1,16.1,1.9,17,3,17z M17,6h3v9h-3V6z M3,13l3-7h9v10l-4.34,4.34 L12,15H3V13z"></path></svg></button></div></div></devsite-thumb-rating>
  
    
  </div>
  
    <devsite-feedback position="header" project-name="Apps Script" product-id="717201" bucket="apps-script" context="" version="t-devsite-webserver-20211014-r01-rc00.438805489023308372" data-label="Send Feedback Button" track-type="feedback" track-name="sendFeedbackLink" track-metadata-position="header" project-feedback-url="https://issuetracker.google.com/issues/new?component=191640&amp;template=824113" project-icon="https://www.gstatic.com/images/branding/product/2x/apps_script_48dp.png" project-support-url="https://developers.google.com/apps-script/support?authuser=0" feedback-type="thumb-rating">

  <button>
  
    
    Send feedback
  
  </button>
</devsite-feedback>
  
  
    <h1 class="devsite-page-title">Admin SDK Directory Service</h1>
  
  <devsite-bookmark class="show" data-title="Remove bookmark" saved=""><input type="checkbox" class="bookmark-checkbox" aria-label="Remove bookmark"></devsite-bookmark>
  <devsite-toc class="devsite-nav devsite-toc-embedded" depth="2" devsite-toc-embedded="" expandable="" visible=""><ul class="devsite-nav-list"><li class="devsite-nav-item devsite-nav-heading devsite-toc-toggle" role="heading" aria-level="2"><span class="devsite-nav-title"><span class="devsite-nav-text">On this page</span></span><button type="button" title="Expand/collapse contents" class="devsite-nav-show-all button-transparent material-icons"></button></li><li class="devsite-nav-item" visible=""><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#reference" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Embedded nav" data-value="0" track-type="navigation" track-name="embeddedNav" track-metadata-position="0" track-metadata-link-destination="#reference"><span class="devsite-nav-text" tooltip="">Reference</span></a></li><li class="devsite-nav-item" visible=""><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#sample_code" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Embedded nav" data-value="1" track-type="navigation" track-name="embeddedNav" track-metadata-position="1" track-metadata-link-destination="#sample_code"><span class="devsite-nav-text" tooltip="">Sample code</span></a><ul class="devsite-nav-list"><li class="devsite-nav-item" visible=""><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#list_all_users" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Embedded nav" data-value="1.0" track-type="navigation" track-name="embeddedNav" track-metadata-position="1.0" track-metadata-link-destination="#list_all_users"><span class="devsite-nav-text" tooltip="">List all users</span></a></li><li class="devsite-nav-item" visible=""><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#get_user" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Embedded nav" data-value="1.1" track-type="navigation" track-name="embeddedNav" track-metadata-position="1.1" track-metadata-link-destination="#get_user"><span class="devsite-nav-text" tooltip="">Get user</span></a></li><li class="devsite-nav-item" visible=""><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#add_user" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Embedded nav" data-value="1.2" track-type="navigation" track-name="embeddedNav" track-metadata-position="1.2" track-metadata-link-destination="#add_user"><span class="devsite-nav-text" tooltip="">Add user</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#create_alias" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Embedded nav" data-value="1.3" track-type="navigation" track-name="embeddedNav" track-metadata-position="1.3" track-metadata-link-destination="#create_alias"><span class="devsite-nav-text" tooltip="">Create alias</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#list_all_groups" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Embedded nav" data-value="1.4" track-type="navigation" track-name="embeddedNav" track-metadata-position="1.4" track-metadata-link-destination="#list_all_groups"><span class="devsite-nav-text" tooltip="">List all groups</span></a></li><li class="devsite-nav-item"><a href="https://developers.google.com/apps-script/advanced/admin-sdk-directory?authuser=0#add_group_member" class="devsite-nav-title gc-analytics-event" data-category="Site-Wide Custom Events" data-action="click" data-label="Embedded nav" data-value="1.5" track-type="navigation" track-name="embeddedNav" track-metadata-position="1.5" track-metadata-link-destination="#add_group_member"><span class="devsite-nav-text" tooltip="">Add group member</span></a></li></ul></li><li class="devsite-toc-toggle"><button type="button" class="button-flat devsite-nav-more-items material-icons" track-type="navigation" track-name="embeddedNavExpand" title="Expand/collapse contents"></button></li></ul></devsite-toc>

  

  <div class="devsite-article-body clearfix
    ">

    
      















<p>The Admin SDK Directory service allows you to use the Admin SDK's
<a href="https://developers.google.com/admin-sdk/directory?authuser=0">Directory API</a> in Apps Script. This API gives
administrators of Google Workspace domains (including
resellers) the ability to
manage devices, groups, users, and other entities in their domains.</p>
<aside class="note"><strong>Note:</strong><span> This is an advanced service that must be
<a href="https://developers.google.com/apps-script/guides/services/advanced?authuser=0">enabled before use</a>. Additionally, the
Admin SDK must be enabled on your domain, as described in the API's
<a href="https://developers.google.com/admin-sdk/directory/v1/guides/prerequisites?authuser=0">prerequisites documentation</a>.</span></aside>
<h2 id="reference" data-text="Reference" role="presentation"><span class="devsite-heading" role="heading" aria-level="2">Reference</span><button type="button" class="devsite-heading-link button-flat material-icons" aria-label="Copy link to this section: Reference" data-title="Copy link to this section: Reference" data-id="reference"></button></h2>

<p>For detailed information on this service, see the
<a href="https://developers.google.com/admin-sdk/directory/v1/reference?authuser=0">reference documentation</a> for the Admin SDK
Directory API. Like all advanced services in Apps Script, the Admin SDK
Directory service uses the same objects, methods, and parameters as the public
API. For more information, see <a href="https://developers.google.com/apps-script/guides/services/advanced?authuser=0#how_method_signatures_are_determined" target="_blank" class="external">How method signatures are determined</a>.</p>

<p>To report issues and find other support, see the
<a href="https://developers.google.com/admin-sdk/directory/support?authuser=0">Admin SDK Directory support guide</a>.</p>

<h2 id="sample_code" data-text="Sample code" role="presentation"><span class="devsite-heading" role="heading" aria-level="2">Sample code</span><button type="button" class="devsite-heading-link button-flat material-icons" aria-label="Copy link to this section: Sample code" data-title="Copy link to this section: Sample code" data-id="sample_code"></button></h2>

<p>The sample code below uses <a href="https://developers.google.com/admin-sdk/directory/v1/reference?authuser=0">version 1</a> of
the API.</p>

<h3 id="list_all_users" data-text="List all users">List all users</h3>

<p>This sample lists all the users in a domain sorted by first name.</p>



 













  
  
  
  
  



  








<style>
  /* Remove extra DevSite2 margin */
  .github-docwidget-gitinclude-code devsite-code,
  devsite-selector>section>devsite-code,
  devsite-selector>section>.github-docwidget-include,
  devsite-selector>section>.github-docwidget-gitinclude-code>devsite-code {
    margin: 0;
  }
  /* Disables includecode margin */
  .github-docwidget-gitinclude-code .prettyprint {
    margin: 0;
  }
  .ds-selector-tabs > section > p { /* Remove extra <p>: b/19236190 */
    display: none;
  }
  .kd-tabbed-horz > article > pre { /* Remove extra spacing */
    margin: 0;
  }
  .ds-selector-tabs > section { /* Remove code section padding */
    padding: 0;
  }
  .filepath {
    color: #fff;
    margin: 6px;
    max-width: calc(100% - 160px); /* Give at least 160px for the "View on GitHub" button. */
    text-overflow: ellipsis;
    text-shadow: rgba(0,0,0,0.1) 1px 1px;
    overflow: hidden;
  }
  .view-on-github {
    text-shadow: rgba(12,12,12,0.1) 1px 1px;
  }
</style>

<div class="github-docwidget-include" style="border-bottom: 0; border-radius: 3px 3px 0 0; padding: 4px; background-color: #039be5;">
  
  <div class="filepath" style="text-align: left; float: left;">advanced/adminSDK.gs</div>
  <div style="text-align: right; float: right;">
    
    <a class="view-on-github button" target="_blank" href="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs" style="color: #039be5;" track-type="github" track-name="gitHubViewButton" track-metadata-link-destination="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs">View on GitHub</a>
  </div>
  
  <div style="clear: both;"></div>
</div><!-- Code --><div class="github-docwidget-gitinclude-code">
  
    
  
  
  <devsite-code data-copy-event-label=""><pre class="" track-metadata-position="googleworkspace/apps-script-samples/advanced/adminSDK.gs/master/apps_script_admin_sdk_list_all_users" data-code-snippet="true" data-github-path="googleworkspace/apps-script-samples/advanced/adminSDK.gs" data-git-revision="master" data-region-tag="apps_script_admin_sdk_list_all_users" translate="no" dir="ltr" is-upgraded=""><span class="com">/**<br>&nbsp;* Lists all the users in a domain sorted by first name.<br>&nbsp;*/</span><span class="pln"><br></span><span class="kwd">function</span><span class="pln"> listAllUsers</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> pageToken</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> page</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="kwd">do</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; page </span><span class="pun">=</span><span class="pln"> </span><span class="typ">AdminDirectory</span><span class="pun">.</span><span class="typ">Users</span><span class="pun">.</span><span class="pln">list</span><span class="pun">({</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; domain</span><span class="pun">:</span><span class="pln"> </span><span class="str">'example.com'</span><span class="pun">,</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; orderBy</span><span class="pun">:</span><span class="pln"> </span><span class="str">'givenName'</span><span class="pun">,</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; maxResults</span><span class="pun">:</span><span class="pln"> </span><span class="lit">100</span><span class="pun">,</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; pageToken</span><span class="pun">:</span><span class="pln"> pageToken<br>&nbsp; &nbsp; </span><span class="pun">});</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="kwd">var</span><span class="pln"> users </span><span class="pun">=</span><span class="pln"> page</span><span class="pun">.</span><span class="pln">users</span><span class="pun">;</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="kwd">if</span><span class="pln"> </span><span class="pun">(</span><span class="pln">users</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; </span><span class="kwd">for</span><span class="pln"> </span><span class="pun">(</span><span class="kwd">var</span><span class="pln"> i </span><span class="pun">=</span><span class="pln"> </span><span class="lit">0</span><span class="pun">;</span><span class="pln"> i </span><span class="pun">&lt;</span><span class="pln"> users</span><span class="pun">.</span><span class="pln">length</span><span class="pun">;</span><span class="pln"> i</span><span class="pun">++)</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="kwd">var</span><span class="pln"> user </span><span class="pun">=</span><span class="pln"> users</span><span class="pun">[</span><span class="pln">i</span><span class="pun">];</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="typ">Logger</span><span class="pun">.</span><span class="pln">log</span><span class="pun">(</span><span class="str">'%s (%s)'</span><span class="pun">,</span><span class="pln"> user</span><span class="pun">.</span><span class="pln">name</span><span class="pun">.</span><span class="pln">fullName</span><span class="pun">,</span><span class="pln"> user</span><span class="pun">.</span><span class="pln">primaryEmail</span><span class="pun">);</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; </span><span class="pun">}</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="pun">}</span><span class="pln"> </span><span class="kwd">else</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; </span><span class="typ">Logger</span><span class="pun">.</span><span class="pln">log</span><span class="pun">(</span><span class="str">'No users found.'</span><span class="pun">);</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="pun">}</span><span class="pln"><br>&nbsp; &nbsp; pageToken </span><span class="pun">=</span><span class="pln"> page</span><span class="pun">.</span><span class="pln">nextPageToken</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="pun">}</span><span class="pln"> </span><span class="kwd">while</span><span class="pln"> </span><span class="pun">(</span><span class="pln">pageToken</span><span class="pun">);</span><span class="pln"><br></span><span class="pun">}</span></pre></devsite-code>
</div>














<h3 id="get_user" data-text="Get user">Get user</h3>

<p>This sample gets a user by their email address and logs all of their data as a
JSON string.</p>



 













  
  
  
  
  










<style>
  /* Remove extra DevSite2 margin */
  .github-docwidget-gitinclude-code devsite-code,
  devsite-selector>section>devsite-code,
  devsite-selector>section>.github-docwidget-include,
  devsite-selector>section>.github-docwidget-gitinclude-code>devsite-code {
    margin: 0;
  }
  /* Disables includecode margin */
  .github-docwidget-gitinclude-code .prettyprint {
    margin: 0;
  }
  .ds-selector-tabs > section > p { /* Remove extra <p>: b/19236190 */
    display: none;
  }
  .kd-tabbed-horz > article > pre { /* Remove extra spacing */
    margin: 0;
  }
  .ds-selector-tabs > section { /* Remove code section padding */
    padding: 0;
  }
  .filepath {
    color: #fff;
    margin: 6px;
    max-width: calc(100% - 160px); /* Give at least 160px for the "View on GitHub" button. */
    text-overflow: ellipsis;
    text-shadow: rgba(0,0,0,0.1) 1px 1px;
    overflow: hidden;
  }
  .view-on-github {
    text-shadow: rgba(12,12,12,0.1) 1px 1px;
  }
</style>

<div class="github-docwidget-include" style="border-bottom: 0; border-radius: 3px 3px 0 0; padding: 4px; background-color: #039be5;">
  
  <div class="filepath" style="text-align: left; float: left;">advanced/adminSDK.gs</div>
  <div style="text-align: right; float: right;">
    
    <a class="view-on-github button" target="_blank" href="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs" style="color: #039be5;" track-type="github" track-name="gitHubViewButton" track-metadata-link-destination="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs">View on GitHub</a>
  </div>
  
  <div style="clear: both;"></div>
</div><!-- Code --><div class="github-docwidget-gitinclude-code">
  
    
  
  
  <devsite-code data-copy-event-label=""><pre class="" track-metadata-position="googleworkspace/apps-script-samples/advanced/adminSDK.gs/master/apps_script_admin_sdk_get_users" data-code-snippet="true" data-github-path="googleworkspace/apps-script-samples/advanced/adminSDK.gs" data-git-revision="master" data-region-tag="apps_script_admin_sdk_get_users" translate="no" dir="ltr" is-upgraded=""><span class="com">/**<br>* Get a user by their email address and logs all of their data as a JSON string.<br>*/</span><span class="pln"><br></span><span class="kwd">function</span><span class="pln"> getUser</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> userEmail </span><span class="pun">=</span><span class="pln"> </span><span class="str">'liz@example.com'</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> user </span><span class="pun">=</span><span class="pln"> </span><span class="typ">AdminDirectory</span><span class="pun">.</span><span class="typ">Users</span><span class="pun">.</span><span class="kwd">get</span><span class="pun">(</span><span class="pln">userEmail</span><span class="pun">);</span><span class="pln"><br>&nbsp; </span><span class="typ">Logger</span><span class="pun">.</span><span class="pln">log</span><span class="pun">(</span><span class="str">'User data:\n %s'</span><span class="pun">,</span><span class="pln"> JSON</span><span class="pun">.</span><span class="pln">stringify</span><span class="pun">(</span><span class="pln">user</span><span class="pun">,</span><span class="pln"> </span><span class="kwd">null</span><span class="pun">,</span><span class="pln"> </span><span class="lit">2</span><span class="pun">));</span><span class="pln"><br></span><span class="pun">}</span></pre></devsite-code>
</div>














<h3 id="add_user" data-text="Add user">Add user</h3>

<p>This sample adds a new user to the domain, including only the required
information. For the full list of user fields, see the API's
<a href="https://developers.google.com/admin-sdk/directory/v1/reference/users/insert?authuser=0">reference documentation</a>.</p>



 













  
  
  
  
  










<style>
  /* Remove extra DevSite2 margin */
  .github-docwidget-gitinclude-code devsite-code,
  devsite-selector>section>devsite-code,
  devsite-selector>section>.github-docwidget-include,
  devsite-selector>section>.github-docwidget-gitinclude-code>devsite-code {
    margin: 0;
  }
  /* Disables includecode margin */
  .github-docwidget-gitinclude-code .prettyprint {
    margin: 0;
  }
  .ds-selector-tabs > section > p { /* Remove extra <p>: b/19236190 */
    display: none;
  }
  .kd-tabbed-horz > article > pre { /* Remove extra spacing */
    margin: 0;
  }
  .ds-selector-tabs > section { /* Remove code section padding */
    padding: 0;
  }
  .filepath {
    color: #fff;
    margin: 6px;
    max-width: calc(100% - 160px); /* Give at least 160px for the "View on GitHub" button. */
    text-overflow: ellipsis;
    text-shadow: rgba(0,0,0,0.1) 1px 1px;
    overflow: hidden;
  }
  .view-on-github {
    text-shadow: rgba(12,12,12,0.1) 1px 1px;
  }
</style>

<div class="github-docwidget-include" style="border-bottom: 0; border-radius: 3px 3px 0 0; padding: 4px; background-color: #039be5;">
  
  <div class="filepath" style="text-align: left; float: left;">advanced/adminSDK.gs</div>
  <div style="text-align: right; float: right;">
    
    <a class="view-on-github button" target="_blank" href="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs" style="color: #039be5;" track-type="github" track-name="gitHubViewButton" track-metadata-link-destination="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs">View on GitHub</a>
  </div>
  
  <div style="clear: both;"></div>
</div><!-- Code --><div class="github-docwidget-gitinclude-code">
  
    
  
  
  <devsite-code data-copy-event-label=""><pre class="" track-metadata-position="googleworkspace/apps-script-samples/advanced/adminSDK.gs/master/apps_script_admin_sdk_add_user" data-code-snippet="true" data-github-path="googleworkspace/apps-script-samples/advanced/adminSDK.gs" data-git-revision="master" data-region-tag="apps_script_admin_sdk_add_user" translate="no" dir="ltr" is-upgraded=""><span class="com">/**<br>&nbsp;* Adds a new user to the domain, including only the required information. For<br>&nbsp;* the full list of user fields, see the API's reference documentation:<br>&nbsp;* @see https://developers.google.com/admin-sdk/directory/v1/reference/users/insert<br>&nbsp;*/</span><span class="pln"><br></span><span class="kwd">function</span><span class="pln"> addUser</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> user </span><span class="pun">=</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; primaryEmail</span><span class="pun">:</span><span class="pln"> </span><span class="str">'liz@example.com'</span><span class="pun">,</span><span class="pln"><br>&nbsp; &nbsp; name</span><span class="pun">:</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; givenName</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Elizabeth'</span><span class="pun">,</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; familyName</span><span class="pun">:</span><span class="pln"> </span><span class="str">'Smith'</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="pun">},</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="com">// Generate a random password string.</span><span class="pln"><br>&nbsp; &nbsp; password</span><span class="pun">:</span><span class="pln"> </span><span class="typ">Math</span><span class="pun">.</span><span class="pln">random</span><span class="pun">().</span><span class="pln">toString</span><span class="pun">(</span><span class="lit">36</span><span class="pun">)</span><span class="pln"><br>&nbsp; </span><span class="pun">};</span><span class="pln"><br>&nbsp; user </span><span class="pun">=</span><span class="pln"> </span><span class="typ">AdminDirectory</span><span class="pun">.</span><span class="typ">Users</span><span class="pun">.</span><span class="pln">insert</span><span class="pun">(</span><span class="pln">user</span><span class="pun">);</span><span class="pln"><br>&nbsp; </span><span class="typ">Logger</span><span class="pun">.</span><span class="pln">log</span><span class="pun">(</span><span class="str">'User %s created with ID %s.'</span><span class="pun">,</span><span class="pln"> user</span><span class="pun">.</span><span class="pln">primaryEmail</span><span class="pun">,</span><span class="pln"> user</span><span class="pun">.</span><span class="pln">id</span><span class="pun">);</span><span class="pln"><br></span><span class="pun">}</span></pre></devsite-code>
</div>














<h3 id="create_alias" data-text="Create alias">Create alias</h3>

<p>This sample creates an alias (nickname) for a user.</p>



 













  
  
  
  
  










<style>
  /* Remove extra DevSite2 margin */
  .github-docwidget-gitinclude-code devsite-code,
  devsite-selector>section>devsite-code,
  devsite-selector>section>.github-docwidget-include,
  devsite-selector>section>.github-docwidget-gitinclude-code>devsite-code {
    margin: 0;
  }
  /* Disables includecode margin */
  .github-docwidget-gitinclude-code .prettyprint {
    margin: 0;
  }
  .ds-selector-tabs > section > p { /* Remove extra <p>: b/19236190 */
    display: none;
  }
  .kd-tabbed-horz > article > pre { /* Remove extra spacing */
    margin: 0;
  }
  .ds-selector-tabs > section { /* Remove code section padding */
    padding: 0;
  }
  .filepath {
    color: #fff;
    margin: 6px;
    max-width: calc(100% - 160px); /* Give at least 160px for the "View on GitHub" button. */
    text-overflow: ellipsis;
    text-shadow: rgba(0,0,0,0.1) 1px 1px;
    overflow: hidden;
  }
  .view-on-github {
    text-shadow: rgba(12,12,12,0.1) 1px 1px;
  }
</style>

<div class="github-docwidget-include" style="border-bottom: 0; border-radius: 3px 3px 0 0; padding: 4px; background-color: #039be5;">
  
  <div class="filepath" style="text-align: left; float: left;">advanced/adminSDK.gs</div>
  <div style="text-align: right; float: right;">
    
    <a class="view-on-github button" target="_blank" href="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs" style="color: #039be5;" track-type="github" track-name="gitHubViewButton" track-metadata-link-destination="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs">View on GitHub</a>
  </div>
  
  <div style="clear: both;"></div>
</div><!-- Code --><div class="github-docwidget-gitinclude-code">
  
    
  
  
  <devsite-code data-copy-event-label=""><pre class="" track-metadata-position="googleworkspace/apps-script-samples/advanced/adminSDK.gs/master/apps_script_admin_sdk_create_alias" data-code-snippet="true" data-github-path="googleworkspace/apps-script-samples/advanced/adminSDK.gs" data-git-revision="master" data-region-tag="apps_script_admin_sdk_create_alias" translate="no" dir="ltr" is-upgraded=""><span class="com">/**<br>&nbsp;* Creates an alias (nickname) for a user.<br>&nbsp;*/</span><span class="pln"><br></span><span class="kwd">function</span><span class="pln"> createAlias</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> userEmail </span><span class="pun">=</span><span class="pln"> </span><span class="str">'liz@example.com'</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> </span><span class="kwd">alias</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="kwd">alias</span><span class="pun">:</span><span class="pln"> </span><span class="str">'chica@example.com'</span><span class="pln"><br>&nbsp; </span><span class="pun">};</span><span class="pln"><br>&nbsp; </span><span class="kwd">alias</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> </span><span class="typ">AdminDirectory</span><span class="pun">.</span><span class="typ">Users</span><span class="pun">.</span><span class="typ">Aliases</span><span class="pun">.</span><span class="pln">insert</span><span class="pun">(</span><span class="kwd">alias</span><span class="pun">,</span><span class="pln"> userEmail</span><span class="pun">);</span><span class="pln"><br>&nbsp; </span><span class="typ">Logger</span><span class="pun">.</span><span class="pln">log</span><span class="pun">(</span><span class="str">'Created alias %s for user %s.'</span><span class="pun">,</span><span class="pln"> </span><span class="kwd">alias</span><span class="pun">.</span><span class="kwd">alias</span><span class="pun">,</span><span class="pln"> userEmail</span><span class="pun">);</span><span class="pln"><br></span><span class="pun">}</span></pre></devsite-code>
</div>














<h3 id="list_all_groups" data-text="List all groups">List all groups</h3>

<p>This sample lists all the groups in the domain.</p>



 













  
  
  
  
  










<style>
  /* Remove extra DevSite2 margin */
  .github-docwidget-gitinclude-code devsite-code,
  devsite-selector>section>devsite-code,
  devsite-selector>section>.github-docwidget-include,
  devsite-selector>section>.github-docwidget-gitinclude-code>devsite-code {
    margin: 0;
  }
  /* Disables includecode margin */
  .github-docwidget-gitinclude-code .prettyprint {
    margin: 0;
  }
  .ds-selector-tabs > section > p { /* Remove extra <p>: b/19236190 */
    display: none;
  }
  .kd-tabbed-horz > article > pre { /* Remove extra spacing */
    margin: 0;
  }
  .ds-selector-tabs > section { /* Remove code section padding */
    padding: 0;
  }
  .filepath {
    color: #fff;
    margin: 6px;
    max-width: calc(100% - 160px); /* Give at least 160px for the "View on GitHub" button. */
    text-overflow: ellipsis;
    text-shadow: rgba(0,0,0,0.1) 1px 1px;
    overflow: hidden;
  }
  .view-on-github {
    text-shadow: rgba(12,12,12,0.1) 1px 1px;
  }
</style>

<div class="github-docwidget-include" style="border-bottom: 0; border-radius: 3px 3px 0 0; padding: 4px; background-color: #039be5;">
  
  <div class="filepath" style="text-align: left; float: left;">advanced/adminSDK.gs</div>
  <div style="text-align: right; float: right;">
    
    <a class="view-on-github button" target="_blank" href="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs" style="color: #039be5;" track-type="github" track-name="gitHubViewButton" track-metadata-link-destination="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs">View on GitHub</a>
  </div>
  
  <div style="clear: both;"></div>
</div><!-- Code --><div class="github-docwidget-gitinclude-code">
  
    
  
  
  <devsite-code data-copy-event-label=""><pre class="" track-metadata-position="googleworkspace/apps-script-samples/advanced/adminSDK.gs/master/apps_script_admin_sdk_list_all_groups" data-code-snippet="true" data-github-path="googleworkspace/apps-script-samples/advanced/adminSDK.gs" data-git-revision="master" data-region-tag="apps_script_admin_sdk_list_all_groups" translate="no" dir="ltr" is-upgraded=""><span class="com">/**<br>&nbsp;* Lists all the groups in the domain.<br>&nbsp;*/</span><span class="pln"><br></span><span class="kwd">function</span><span class="pln"> listAllGroups</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> pageToken</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> page</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="kwd">do</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; page </span><span class="pun">=</span><span class="pln"> </span><span class="typ">AdminDirectory</span><span class="pun">.</span><span class="typ">Groups</span><span class="pun">.</span><span class="pln">list</span><span class="pun">({</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; domain</span><span class="pun">:</span><span class="pln"> </span><span class="str">'example.com'</span><span class="pun">,</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; maxResults</span><span class="pun">:</span><span class="pln"> </span><span class="lit">100</span><span class="pun">,</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; pageToken</span><span class="pun">:</span><span class="pln"> pageToken<br>&nbsp; &nbsp; </span><span class="pun">});</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="kwd">var</span><span class="pln"> groups </span><span class="pun">=</span><span class="pln"> page</span><span class="pun">.</span><span class="pln">groups</span><span class="pun">;</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="kwd">if</span><span class="pln"> </span><span class="pun">(</span><span class="pln">groups</span><span class="pun">)</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; </span><span class="kwd">for</span><span class="pln"> </span><span class="pun">(</span><span class="kwd">var</span><span class="pln"> i </span><span class="pun">=</span><span class="pln"> </span><span class="lit">0</span><span class="pun">;</span><span class="pln"> i </span><span class="pun">&lt;</span><span class="pln"> groups</span><span class="pun">.</span><span class="pln">length</span><span class="pun">;</span><span class="pln"> i</span><span class="pun">++)</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="kwd">var</span><span class="pln"> </span><span class="kwd">group</span><span class="pln"> </span><span class="pun">=</span><span class="pln"> groups</span><span class="pun">[</span><span class="pln">i</span><span class="pun">];</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; &nbsp; </span><span class="typ">Logger</span><span class="pun">.</span><span class="pln">log</span><span class="pun">(</span><span class="str">'%s (%s)'</span><span class="pun">,</span><span class="pln"> </span><span class="kwd">group</span><span class="pun">.</span><span class="pln">name</span><span class="pun">,</span><span class="pln"> </span><span class="kwd">group</span><span class="pun">.</span><span class="pln">email</span><span class="pun">);</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; </span><span class="pun">}</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="pun">}</span><span class="pln"> </span><span class="kwd">else</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; &nbsp; </span><span class="typ">Logger</span><span class="pun">.</span><span class="pln">log</span><span class="pun">(</span><span class="str">'No groups found.'</span><span class="pun">);</span><span class="pln"><br>&nbsp; &nbsp; </span><span class="pun">}</span><span class="pln"><br>&nbsp; &nbsp; pageToken </span><span class="pun">=</span><span class="pln"> page</span><span class="pun">.</span><span class="pln">nextPageToken</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="pun">}</span><span class="pln"> </span><span class="kwd">while</span><span class="pln"> </span><span class="pun">(</span><span class="pln">pageToken</span><span class="pun">);</span><span class="pln"><br></span><span class="pun">}</span></pre></devsite-code>
</div>














<h3 id="add_group_member" data-text="Add group member">Add group member</h3>

<p>This sample adds a user to an existing group in the domain.</p>



 













  
  
  
  
  










<style>
  /* Remove extra DevSite2 margin */
  .github-docwidget-gitinclude-code devsite-code,
  devsite-selector>section>devsite-code,
  devsite-selector>section>.github-docwidget-include,
  devsite-selector>section>.github-docwidget-gitinclude-code>devsite-code {
    margin: 0;
  }
  /* Disables includecode margin */
  .github-docwidget-gitinclude-code .prettyprint {
    margin: 0;
  }
  .ds-selector-tabs > section > p { /* Remove extra <p>: b/19236190 */
    display: none;
  }
  .kd-tabbed-horz > article > pre { /* Remove extra spacing */
    margin: 0;
  }
  .ds-selector-tabs > section { /* Remove code section padding */
    padding: 0;
  }
  .filepath {
    color: #fff;
    margin: 6px;
    max-width: calc(100% - 160px); /* Give at least 160px for the "View on GitHub" button. */
    text-overflow: ellipsis;
    text-shadow: rgba(0,0,0,0.1) 1px 1px;
    overflow: hidden;
  }
  .view-on-github {
    text-shadow: rgba(12,12,12,0.1) 1px 1px;
  }
</style>

<div class="github-docwidget-include" style="border-bottom: 0; border-radius: 3px 3px 0 0; padding: 4px; background-color: #039be5;">
  
  <div class="filepath" style="text-align: left; float: left;">advanced/adminSDK.gs</div>
  <div style="text-align: right; float: right;">
    
    <a class="view-on-github button" target="_blank" href="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs" style="color: #039be5;" track-type="github" track-name="gitHubViewButton" track-metadata-link-destination="https://github.com/googleworkspace/apps-script-samples/blob/master/advanced/adminSDK.gs">View on GitHub</a>
  </div>
  
  <div style="clear: both;"></div>
</div><!-- Code --><div class="github-docwidget-gitinclude-code">
  
    
  
  
  <devsite-code data-copy-event-label=""><pre class="" track-metadata-position="googleworkspace/apps-script-samples/advanced/adminSDK.gs/master/apps_script_admin_sdk_add_group_member" data-code-snippet="true" data-github-path="googleworkspace/apps-script-samples/advanced/adminSDK.gs" data-git-revision="master" data-region-tag="apps_script_admin_sdk_add_group_member" translate="no" dir="ltr" is-upgraded=""><span class="com">/**<br>&nbsp;* Adds a user to an existing group in the domain.<br>&nbsp;*/</span><span class="pln"><br></span><span class="kwd">function</span><span class="pln"> addGroupMember</span><span class="pun">()</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> userEmail </span><span class="pun">=</span><span class="pln"> </span><span class="str">'liz@example.com'</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> groupEmail </span><span class="pun">=</span><span class="pln"> </span><span class="str">'bookclub@example.com'</span><span class="pun">;</span><span class="pln"><br>&nbsp; </span><span class="kwd">var</span><span class="pln"> member </span><span class="pun">=</span><span class="pln"> </span><span class="pun">{</span><span class="pln"><br>&nbsp; &nbsp; email</span><span class="pun">:</span><span class="pln"> userEmail</span><span class="pun">,</span><span class="pln"><br>&nbsp; &nbsp; role</span><span class="pun">:</span><span class="pln"> </span><span class="str">'MEMBER'</span><span class="pln"><br>&nbsp; </span><span class="pun">};</span><span class="pln"><br>&nbsp; member </span><span class="pun">=</span><span class="pln"> </span><span class="typ">AdminDirectory</span><span class="pun">.</span><span class="typ">Members</span><span class="pun">.</span><span class="pln">insert</span><span class="pun">(</span><span class="pln">member</span><span class="pun">,</span><span class="pln"> groupEmail</span><span class="pun">);</span><span class="pln"><br>&nbsp; </span><span class="typ">Logger</span><span class="pun">.</span><span class="pln">log</span><span class="pun">(</span><span class="str">'User %s added as a member of group %s.'</span><span class="pun">,</span><span class="pln"> userEmail</span><span class="pun">,</span><span class="pln"> groupEmail</span><span class="pun">);</span><span class="pln"><br></span><span class="pun">}</span></pre></devsite-code>
</div>













    

    
  </div>

  

  
    
    
      
    <devsite-thumb-rating position="footer"><div class="devsite-thumb-rating" role="form" aria-labelledby="devsite-thumb-label-footer" tabindex="0"><div class="devsite-thumb-label" id="devsite-thumb-label-footer">Was this helpful?</div><div class="devsite-thumbs"><button class="devsite-thumb devsite-thumb-up" data-title="Helpful" aria-label="Helpful"><svg class="devsite-thumb-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21,7h-6.31l0.95-4.57l0.03-0.32c0-0.41-0.17-0.79-0.44-1.06L14.17,0c0,0-7.09,6.85-7.17,7H2v13h16 c0.83,0,1.54-0.5,1.84-1.22l3.02-7.05C22.95,11.5,23,11.26,23,11V9C23,7.9,22.1,7,21,7z M7,18H4V9h3V18z M21,11l-3,7H9V8l4.34-4.34 L12,9h9V11z"></path></svg></button><button class="devsite-thumb devsite-thumb-down" data-title="Not helpful" aria-label="Not helpful"><svg class="devsite-thumb-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3,17h6.31l-0.95,4.57l-0.03,0.32c0,0.41,0.17,0.79,0.44,1.06L9.83,24c0,0,7.09-6.85,7.17-7h5V4H6 C5.17,4,4.46,4.5,4.16,5.22l-3.02,7.05C1.05,12.5,1,12.74,1,13v2C1,16.1,1.9,17,3,17z M17,6h3v9h-3V6z M3,13l3-7h9v10l-4.34,4.34 L12,15H3V13z"></path></svg></button></div></div></devsite-thumb-rating>
  
       
         <devsite-feedback position="footer" project-name="Apps Script" product-id="717201" bucket="apps-script" context="" version="t-devsite-webserver-20211014-r01-rc00.438805489023308372" data-label="Send Feedback Button" track-type="feedback" track-name="sendFeedbackLink" track-metadata-position="footer" project-feedback-url="https://issuetracker.google.com/issues/new?component=191640&amp;template=824113" project-icon="https://www.gstatic.com/images/branding/product/2x/apps_script_48dp.png" project-support-url="https://developers.google.com/apps-script/support?authuser=0" feedback-type="thumb-rating">

  <button>
  
    
    Send feedback
  
  </button>
</devsite-feedback>
       
    
    
  

  
  
</article>


<devsite-content-footer class="nocontent">
  <p>Except as otherwise noted, the content of this page is licensed under the <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 License</a>, and code samples are licensed under the <a href="https://www.apache.org/licenses/LICENSE-2.0">Apache 2.0 License</a>. For details, see the <a href="https://developers.google.com/site-policies?authuser=0">Google Developers Site Policies</a>. Java is a registered trademark of Oracle and/or its affiliates.</p>
  <p>Last updated 2021-06-15 UTC.</p>
</devsite-content-footer>





  
<div class="devsite-content-data">
  <template class="devsite-thumb-rating-down-categories"></template>
  <template class="devsite-thumb-rating-up-categories"></template>
  
    
    
    <template class="devsite-thumb-rating-feedback"></template>
  
</div>
            
          </devsite-content>
        </main>
        <devsite-footer-promos class="devsite-footer">
          
            

<nav class="devsite-footer-promos nocontent" aria-label="Promotions">
  <ul class="devsite-footer-promos-list">
    
    <li class="devsite-footer-promo">
      <a href="https://cloud.google.com/blog/topics/workspace-developers?authuser=0" class="devsite-footer-promo-title gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Promo Link (index 1)" target="_blank">
        
        
        <img class="devsite-footer-promo-icon" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/blogger_48dp.png" loading="lazy" alt="Blog">
        
        Blog
      </a>
      <div class="devsite-footer-promo-description">The latest news on the Google Workspace Developers blog</div>
    </li>
    
    <li class="devsite-footer-promo">
      <a href="https://issuetracker.google.com/issues?q=componentid%3A191640&amp;authuser=0" class="devsite-footer-promo-title gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Promo Link (index 2)" target="_blank">
        
        
        <img class="devsite-footer-promo-icon" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/developers_64dp.png" loading="lazy" alt="Issue Tracker">
        
        Issue Tracker
      </a>
      <div class="devsite-footer-promo-description">Something wrong? Send us a bug report!</div>
    </li>
    
    <li class="devsite-footer-promo">
      <a href="http://stackoverflow.com/questions/tagged/google-apps-script" class="devsite-footer-promo-title gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Promo Link (index 3)" target="_blank">
        
        
        <img class="devsite-footer-promo-icon" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/logo-stack-overflow.svg" loading="lazy" alt="Stack Overflow">
        
        Stack Overflow
      </a>
      <div class="devsite-footer-promo-description">Ask a question under the google-apps-script tag</div>
    </li>
    
    <li class="devsite-footer-promo">
      <a href="https://developers.google.com/apps-script/guides/videos?authuser=0" class="devsite-footer-promo-title gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Promo Link (index 4)">
        
        
        <img class="devsite-footer-promo-icon" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/youtube_64dp.png" loading="lazy" alt="Videos">
        
        Videos
      </a>
      <div class="devsite-footer-promo-description">Watch Apps Script tutorials</div>
    </li>
    
    <li class="devsite-footer-promo">
      <a href="https://www.youtube.com/c/TotallyUnscriptedShow?authuser=0" class="devsite-footer-promo-title gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Promo Link (index 5)" target="_blank">
        
        
        <img class="devsite-footer-promo-icon" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/totally-unscripted-icon.png" loading="lazy" alt="Totally Unscripted">
        
        Totally Unscripted
      </a>
      <div class="devsite-footer-promo-description">Check out the Apps Script show on YouTube</div>
    </li>
    
  </ul>
</nav>

          
        </devsite-footer-promos>
        <devsite-footer-linkboxes class="devsite-footer">
          
            
<nav class="devsite-footer-linkboxes nocontent" aria-label="Footer links">
  
  <ul class="devsite-footer-linkboxes-list">
    
    <li class="devsite-footer-linkbox ">
    <h3 class="devsite-footer-linkbox-heading no-link">Tools</h3>
      <ul class="devsite-footer-linkbox-list">
        
        <li class="devsite-footer-linkbox-item">
          
          <a href="https://script.google.com/create" class="devsite-footer-linkbox-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Link (index 1)">
          
            Script Editor
          
          </a>
          
        </li>
        
        <li class="devsite-footer-linkbox-item">
          
          <a href="https://script.google.com/home" class="devsite-footer-linkbox-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Link (index 2)">
          
            Apps Script Dashboard
          
          </a>
          
        </li>
        
      </ul>
    </li>
    
    <li class="devsite-footer-linkbox ">
    <h3 class="devsite-footer-linkbox-heading no-link">Connect</h3>
      <ul class="devsite-footer-linkbox-list">
        
        <li class="devsite-footer-linkbox-item">
          
          <a href="https://twitter.com/workspacedevs" class="devsite-footer-linkbox-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Link (index 1)">
          
            @workspacedevs on Twitter
          
          </a>
          
        </li>
        
      </ul>
    </li>
    
    <li class="devsite-footer-linkbox ">
    <h3 class="devsite-footer-linkbox-heading no-link">Product Info</h3>
      <ul class="devsite-footer-linkbox-list">
        
        <li class="devsite-footer-linkbox-item">
          
          <a href="https://developers.google.com/apps-script/terms" class="devsite-footer-linkbox-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Link (index 1)">
          
            Terms of Service
          
          </a>
          
        </li>
        
      </ul>
    </li>
    
  </ul>
  
</nav>
          
        </devsite-footer-linkboxes>
        <devsite-footer-utility class="devsite-footer">
          
            

<div class="devsite-footer-utility nocontent">
  
  
  <nav class="devsite-footer-sites" aria-label="Other Google Developers websites">
    <a href="https://developers.google.com/?authuser=0" class="devsite-footer-sites-logo-link gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Google Developers Link">
      <img class="devsite-footer-sites-logo" src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/lockup-developers.svg" loading="lazy" alt="Google Developers">
    </a>
    <ul class="devsite-footer-sites-list">
      
      <li class="devsite-footer-sites-item">
        <a href="https://developer.android.com/?authuser=0" class="devsite-footer-sites-link
                  gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Android Link">
          Android
        </a>
      </li>
      
      <li class="devsite-footer-sites-item">
        <a href="https://developer.chrome.com/home" class="devsite-footer-sites-link
                  gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Chrome Link">
          Chrome
        </a>
      </li>
      
      <li class="devsite-footer-sites-item">
        <a href="https://firebase.google.com/?authuser=0" class="devsite-footer-sites-link
                  gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Firebase Link">
          Firebase
        </a>
      </li>
      
      <li class="devsite-footer-sites-item">
        <a href="https://cloud.google.com/?authuser=0" class="devsite-footer-sites-link
                  gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer Google Cloud Platform Link">
          Google Cloud Platform
        </a>
      </li>
      
      <li class="devsite-footer-sites-item">
        <a href="https://developers.google.com/products?authuser=0" class="devsite-footer-sites-link
                  gc-analytics-event" data-category="Site-Wide Custom Events" data-label="Footer All products Link">
          All products
        </a>
      </li>
      
    </ul>
  </nav>
  

  
  <nav class="devsite-footer-utility-links" aria-label="Utility links">
    
    <ul class="devsite-footer-utility-list">
      
      <li class="devsite-footer-utility-item
                 ">
        
        
        <a class="devsite-footer-utility-link gc-analytics-event" href="https://developers.google.com/terms/site-terms?authuser=0" data-category="Site-Wide Custom Events" data-label="Footer Terms link">
          Terms
        </a>
        
      </li>
      
      <li class="devsite-footer-utility-item
                 ">
        
        
        <a class="devsite-footer-utility-link gc-analytics-event" href="https://policies.google.com/privacy?authuser=0" data-category="Site-Wide Custom Events" data-label="Footer Privacy link">
          Privacy
        </a>
        
      </li>
      
      <li class="devsite-footer-utility-item
                 devsite-footer-utility-button">
        
        <span class="devsite-footer-utility-description">Sign up for the Google Developers newsletter</span>
        
        
        <a class="devsite-footer-utility-link gc-analytics-event" href="https://services.google.com/fb/forms/googledevelopersnewsletter/?utm_medium=referral&amp;%3Butm_source=google-products&amp;%3Butm_team=googledevs&amp;%3Butm_campaign=201611-newsletter-launch&amp;authuser=0" data-category="Site-Wide Custom Events" data-label="Footer Subscribe link">
          Subscribe
        </a>
        
      </li>
      
    </ul>
    
    
    
<devsite-language-selector>
  <devsite-select class="devsite-language-selector-menu">
    
    <select aria-label="Select your language preference." class="devsite-language-selector-select" name="language" track-name="click" track-type="languageSelector">
    
    
      <option value="en" lang="en" selected="selected">
        English
      </option>
    
      <option value="id" lang="id">
        Bahasa Indonesia
      </option>
    
      <option value="de" lang="de">
        Deutsch
      </option>
    
      <option value="es" lang="es">
        Español
      </option>
    
      <option value="fr" lang="fr">
        Français
      </option>
    
      <option value="pt_br" lang="pt_br">
        Português – Brasil
      </option>
    
      <option value="ru" lang="ru">
        Русский
      </option>
    
      <option value="zh_cn" lang="zh_cn">
        中文 – 简体
      </option>
    
      <option value="ja" lang="ja">
        日本語
      </option>
    
      <option value="ko" lang="ko">
        한국어
      </option>
    
    </select>
  <div class="devsite-select"><label id="devsite-select-29220040246396386-label" style="display:none;" aria-label="Select your language preference.">Select an option</label><button type="button" class="devsite-select-toggle" id="devsite-select-29220040246396386-button" aria-haspopup="true" aria-labelledby="devsite-select-29220040246396386-label devsite-select-29220040246396386-button" aria-controls="devsite-select-29220040246396386-popup"><span class="devsite-select-toggle-label">English</span><span class="devsite-icon devsite-icon-arrow-drop-down devsite-select-toggle-icon" aria-hidden="true"></span></button><ul class="devsite-select-list" id="devsite-select-29220040246396386-popup" tabindex="-1" role="listbox" scrollbars="" aria-labelledby="devsite-select-29220040246396386-button"><li role="option" lang="en" value="en" id="devsite-select-29220040246396386-0" class="devsite-select-item" data-index="0" data-selected="" aria-selected="true" aria-label="English, selected">English</li><li role="option" lang="id" value="id" id="devsite-select-29220040246396386-1" class="devsite-select-item" data-index="1" aria-selected="false" aria-label="Bahasa Indonesia">Bahasa Indonesia</li><li role="option" lang="de" value="de" id="devsite-select-29220040246396386-2" class="devsite-select-item" data-index="2" aria-selected="false" aria-label="Deutsch">Deutsch</li><li role="option" lang="es" value="es" id="devsite-select-29220040246396386-3" class="devsite-select-item" data-index="3" aria-selected="false" aria-label="Español">Español</li><li role="option" lang="fr" value="fr" id="devsite-select-29220040246396386-4" class="devsite-select-item" data-index="4" aria-selected="false" aria-label="Français">Français</li><li role="option" lang="pt_br" value="pt_br" id="devsite-select-29220040246396386-5" class="devsite-select-item" data-index="5" aria-selected="false" aria-label="Português – Brasil">Português – Brasil</li><li role="option" lang="ru" value="ru" id="devsite-select-29220040246396386-6" class="devsite-select-item" data-index="6" aria-selected="false" aria-label="Русский">Русский</li><li role="option" lang="zh_cn" value="zh_cn" id="devsite-select-29220040246396386-7" class="devsite-select-item" data-index="7" aria-selected="false" aria-label="中文 – 简体">中文 – 简体</li><li role="option" lang="ja" value="ja" id="devsite-select-29220040246396386-8" class="devsite-select-item" data-index="8" aria-selected="false" aria-label="日本語">日本語</li><li role="option" lang="ko" value="ko" id="devsite-select-29220040246396386-9" class="devsite-select-item" data-index="9" aria-selected="false" aria-label="한국어">한국어</li></ul></div></devsite-select>
</devsite-language-selector>

  </nav>
</div>
          
        </devsite-footer-utility>
        <devsite-panel style="height: auto;"></devsite-panel>
      </section></section>
    <devsite-sitemask></devsite-sitemask>
    <devsite-snackbar style="bottom: 0px;" type="custom">
<div class="devsite-snackbar-snack" type="custom" role="alert" show=""><div class="devsite-snackbar-inner"><div class="devsite-snackbar-message">Page saved.</div><a href="https://developers.google.com/profile/u/me/saved-pages?authuser=0&amp;utm_source=developers.google.com" class="devsite-snackbar-link button">View Saved Pages</a></div></div></devsite-snackbar>
    <devsite-tooltip></devsite-tooltip>
    <devsite-heading-link></devsite-heading-link>
    <devsite-analytics enable-analytics-iframe="">
      
        <script type="application/json" analytics="">[{"gaid": "UA-24532603-1", "dimensions": {"dimension5": "en", "dimension3": false, "dimension6": "en", "dimension4": "Apps Script", "dimension1": "Signed In", "dimension11": false}, "metrics": {"ratings_count": "metric2", "ratings_value": "metric1"}}]</script>
<script type="application/json" gtm="">{"parameters": {"freeTrialEligibleUser": "False", "internalUser": "False", "language": {"machineTranslated": "False", "requested": "en", "served": "en"}, "pageType": "article", "projectName": "Apps Script", "signedIn": "True", "tenant": "developers", "recommendations": {"sourcePage": "", "sourceType": 0, "sourceRank": 0, "sourceIdenticalDescriptions": 0, "sourceTitleWords": 0, "sourceDescriptionWords": 0, "experiment": ""}}}</script>
      
    <iframe src="./Admin SDK Directory Service  _  Apps Script  _  Google Developers_files/analytics-iframe.html"></iframe></devsite-analytics>
    
      <devsite-badger></devsite-badger>
    
    
    <script nonce="">
  
  (function(d,e,v,s,i,t,E){d['GoogleDevelopersObject']=i;
    t=e.createElement(v);t.async=1;t.src=s;E=e.getElementsByTagName(v)[0];
    E.parentNode.insertBefore(t,E);})(window, document, 'script',
    'https://www.gstatic.com/devrel-devsite/prod/v0a713fec70a4b4c54311265d5142e962747a0e45a24063467564a2765c008ac7/developers/js/app_loader.js', '[1,"en",null,"/js/devsite_app_module.js","https://www.gstatic.com/devrel-devsite/prod/v0a713fec70a4b4c54311265d5142e962747a0e45a24063467564a2765c008ac7","https://www.gstatic.com/devrel-devsite/prod/v0a713fec70a4b4c54311265d5142e962747a0e45a24063467564a2765c008ac7/developers","https://developers-dot-devsite-v2-prod.appspot.com",null,null,["/_pwa/developers/manifest.json","https://www.gstatic.com/devrel-devsite/prod/v0a713fec70a4b4c54311265d5142e962747a0e45a24063467564a2765c008ac7/images/video-placeholder.svg","https://www.gstatic.com/devrel-devsite/prod/v0a713fec70a4b4c54311265d5142e962747a0e45a24063467564a2765c008ac7/developers/images/favicon.png","https://fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:400,400italic,500,500italic,700,700italic|Roboto+Mono:400,500,700&display=swap"],1,null,[1,6,8,12,14,17,18,21,25,40,45,50,63,70,75,76,80,87,91,92,93,97,98,100,101,102,103,104,105,107,108,109,110,111,112,113,115,116,117,118,120,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,138,141,142,144,147,148,149,150,151,152,154,161,165],"AIzaSyAP-jjEJBzmIyKR4F-3XITp8yM9T1gEEI8","AIzaSyB6xiKGDR5O3Ak2okS4rLkauxGUG7XP0hg","developers.google.com"]')
  
</script>
    <devsite-a11y-announce aria-live="assertive" aria-atomic="true"></devsite-a11y-announce>
  
</body></html>Syntax error: SyntaxError: Unexpected token '<' line: 4 file: Code.gs/**
 * Copyright Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START apps_script_admin_sdk_list_all_users]
/**
 * Lists all the users in a domain sorted by first name.
 */
function listAllUsers() {
  var pageToken;
  var page;
  do {
    page = AdminDirectory.Users.list({
      domain: 'example.com',
      orderBy: 'givenName',
      maxResults: 100,
      pageToken: pageToken
    });
    var users = page.users;
    if (users) {
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        Logger.log('%s (%s)', user.name.fullName, user.primaryEmail);
      }
    } else {
      Logger.log('No users found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}
// [END apps_script_admin_sdk_list_all_users]

// [START apps_script_admin_sdk_get_users]
/**
* Get a user by their email address and logs all of their data as a JSON string.
*/
function getUser() {
  var userEmail = 'liz@example.com';
  var user = AdminDirectory.Users.get(userEmail);
  Logger.log('User data:\n %s', JSON.stringify(user, null, 2));
}
// [END apps_script_admin_sdk_get_users]

// [START apps_script_admin_sdk_add_user]
/**
 * Adds a new user to the domain, including only the required information. For
 * the full list of user fields, see the API's reference documentation:
 * @see https://developers.google.com/admin-sdk/directory/v1/reference/users/insert
 */
function addUser() {
  var user = {
    primaryEmail: 'liz@example.com',
    name: {
      givenName: 'Elizabeth',
      familyName: 'Smith'
    },
    // Generate a random password string.
    password: Math.random().toString(36)
  };
  user = AdminDirectory.Users.insert(user);
  Logger.log('User %s created with ID %s.', user.primaryEmail, user.id);
}
// [END apps_script_admin_sdk_add_user]

// [START apps_script_admin_sdk_create_alias]
/**
 * Creates an alias (nickname) for a user.
 */
function createAlias() {
  var userEmail = 'liz@example.com';
  var alias = {
    alias: 'chica@example.com'
  };
  alias = AdminDirectory.Users.Aliases.insert(alias, userEmail);
  Logger.log('Created alias %s for user %s.', alias.alias, userEmail);
}
// [END apps_script_admin_sdk_create_alias]

// [START apps_script_admin_sdk_list_all_groups]
/**
 * Lists all the groups in the domain.
 */
function listAllGroups() {
  var pageToken;
  var page;
  do {
    page = AdminDirectory.Groups.list({
      domain: 'example.com',
      maxResults: 100,
      pageToken: pageToken
    });
    var groups = page.groups;
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        var group = groups[i];
        Logger.log('%s (%s)', group.name, group.email);
      }
    } else {
      Logger.log('No groups found.');
    }
    pageToken = page.nextPageToken;
  } while (pageToken);
}
// [END apps_script_admin_sdk_list_all_groups]

// [START apps_script_admin_sdk_add_group_member]
/**
 * Adds a user to an existing group in the domain.
 */
function addGroupMember() {
  var userEmail = 'liz@example.com';
  var groupEmail = 'bookclub@example.com';
  var member = {
    email: userEmail,
    role: 'MEMBER'
  };
  member = AdminDirectory.Members.insert(member, groupEmail);
  Logger.log('User %s added as a member of group %s.', userEmail, groupEmail);
}
// [END apps_script_admin_sdk_add_group_member]

// [START apps_script_admin_sdk_migrate]
/**
 * Gets three RFC822 formatted messages from the each of the latest three
 * threads in the user's Gmail inbox, creates a blob from the email content
 * (including attachments), and inserts it in a Google Group in the domain.
 */
function migrateMessages() {
  var groupId = 'exampleGroup@example.com';
  var messagesToMigrate = getRecentMessagesContent();
  for (var i = 0; i < messagesToMigrate.length; i++) {
    var messageContent = messagesToMigrate[i];
    var contentBlob = Utilities.newBlob(messageContent, 'message/rfc822');
    AdminGroupsMigration.Archive.insert(groupId, contentBlob);
  }
}

/**
 * Gets a list of recent messages' content from the user's Gmail account.
 * By default, fetches 3 messages from the latest 3 threads.
 *
 * @return {Array} the messages' content.
 */
function getRecentMessagesContent() {
  var NUM_THREADS = 3;
  var NUM_MESSAGES = 3;
  var threads = GmailApp.getInboxThreads(0, NUM_THREADS);
  var messages = GmailApp.getMessagesForThreads(threads);
  var messagesContent = [];
  for (var i = 0; i < messages.length; i++) {
    for (var j = 0; j < NUM_MESSAGES; j++) {
      var message = messages[i][j];
      if (message) {
        messagesContent.push(message.getRawContent());
      }
    }
  }
  return messagesContent;
}
// [END apps_script_admin_sdk_migrate]

// [START apps_script_admin_sdk_get_group_setting]
/**
 * Gets a group's settings and logs them to the console.
 */
function getGroupSettings() {
  var groupId = 'exampleGroup@example.com';
  var group = AdminGroupsSettings.Groups.get(groupId);
  Logger.log(JSON.stringify(group, null, 2));
}
// [END apps_script_admin_sdk_get_group_setting]

// [START apps_script_admin_sdk_update_group_setting]
/**
 * Updates group's settings. Here, the description is modified, but various
 * other settings can be changed in the same way.
 */
function updateGroupSettings() {
  var groupId = 'exampleGroup@example.com';
  var group = AdminGroupsSettings.newGroups();
  group.description = 'Newly changed group description';
  AdminGroupsSettings.Groups.patch(group, groupId);
}
// [END apps_script_admin_sdk_update_group_setting]

// [START apps_script_admin_sdk_get_license_assignments]
/**
 * Logs the license assignments, including the product ID and the sku ID, for
 * the users in the domain. Notice the use of page tokens to access the full
 * list of results.
 */
function getLicenseAssignments() {
  var productId = 'Google-Apps';
  var customerId = 'example.com';
  var assignments;
  var pageToken;
  do {
    assignments = AdminLicenseManager.LicenseAssignments
        .listForProduct(productId, customerId, {
      maxResults: 500,
      pageToken: pageToken
    });
  } while (pageToken);
  for (var i = 0; i < assignments.items.length; i++) {
    var assignment = assignments.items[i];
    Logger.log('userId: %s, productId: %s, skuId: %s',
        assignment.userId, assignment.productId, assignment.skuId);
  }
}
// [END apps_script_admin_sdk_get_license_assignments]

// [START apps_script_admin_sdk_insert_license_assignment]
/**
 * Insert a license assignment for a user, for a given product ID and sku ID
 * combination.
 */
function insertLicenseAssignment() {
  var productId = 'Google-Apps';
  var skuId = 'Google-Vault';
  var userId = 'marty@hoverboard.net';
  var results = AdminLicenseManager.LicenseAssignments
      .insert({userId: userId}, productId, skuId);
  Logger.log(results);
}
// [END apps_script_admin_sdk_insert_license_assignment]

// [START apps_script_admin_sdk_generate_login_activity_report]
/**
 * Generates a login activity report for the last week as a spreadsheet. The
 * report includes the time, user, and login result.
 */
function generateLoginActivityReport() {
  var now = new Date();
  var oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var startTime = oneWeekAgo.toISOString();
  var endTime = now.toISOString();

  var rows = [];
  var pageToken;
  var page;
  do {
    page = AdminReports.Activities.list('all', 'login', {
      startTime: startTime,
      endTime: endTime,
      maxResults: 500,
      pageToken: pageToken
    });
    var items = page.items;
    if (items) {
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var row = [
          new Date(item.id.time),
          item.actor.email,
          item.events[0].name
        ];
        rows.push(row);
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length > 0) {
    var spreadsheet = SpreadsheetApp.create('G Suite Login Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = ['Time', 'User', 'Login Result'];
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    Logger.log('Report spreadsheet created: %s', spreadsheet.getUrl());
  } else {
    Logger.log('No results returned.');
  }
}
// [END apps_script_admin_sdk_generate_login_activity_report]

// [START apps_script_admin_sdk_generate_user_usage_report]
/**
 * Generates a user usage report for this day last week as a spreadsheet. The
 * report includes the date, user, last login time, number of emails received,
 * and number of drive files created.
 */
function generateUserUsageReport() {
  var today = new Date();
  var oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  var timezone = Session.getScriptTimeZone();
  var date = Utilities.formatDate(oneWeekAgo, timezone, 'yyyy-MM-dd');

  var parameters = [
    'accounts:last_login_time',
    'gmail:num_emails_received',
    'drive:num_items_created'
  ];
  var rows = [];
  var pageToken;
  var page;
  do {
    page = AdminReports.UserUsageReport.get('all', date, {
      parameters: parameters.join(','),
      maxResults: 500,
      pageToken: pageToken
    });
    if (page.warnings) {
      for (var i = 0; i < page.warnings.length; i++) {
        var warning = page.warnings[i];
        Logger.log(warning.message);
      }
    }
    var reports = page.usageReports;
    if (reports) {
      for (var i = 0; i < reports.length; i++) {
        var report = reports[i];
        var parameterValues = getParameterValues(report.parameters);
        var row = [
          report.date,
          report.entity.userEmail,
          parameterValues['accounts:last_login_time'],
          parameterValues['gmail:num_emails_received'],
          parameterValues['drive:num_items_created']
        ];
        rows.push(row);
      }
    }
    pageToken = page.nextPageToken;
  } while (pageToken);

  if (rows.length > 0) {
    var spreadsheet = SpreadsheetApp.create('G Suite User Usage Report');
    var sheet = spreadsheet.getActiveSheet();

    // Append the headers.
    var headers = ['Date', 'User', 'Last Login', 'Num Emails Received',
        'Num Drive Files Created'];
    sheet.appendRow(headers);

    // Append the results.
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    Logger.log('Report spreadsheet created: %s', spreadsheet.getUrl());
  } else {
    Logger.log('No results returned.');
  }
}

/**
 * Gets a map of parameter names to values from an array of parameter objects.
 * @param {Array} parameters An array of parameter objects.
 * @return {Object} A map from parameter names to their values.
 */
function getParameterValues(parameters) {
  return parameters.reduce(function(result, parameter) {
    var name = parameter.name;
    var value;
    if (parameter.intValue !== undefined) {
      value = parameter.intValue;
    } else if (parameter.stringValue !== undefined) {
      value = parameter.stringValue;
    } else if (parameter.datetimeValue !== undefined) {
      value = new Date(parameter.datetimeValue);
    } else if (parameter.boolValue !== undefined) {
      value = parameter.boolValue;
    }
    result[name] = value;
    return result;
  }, {});
}
// [END apps_script_admin_sdk_generate_user_usage_report]

// [START apps_script_admin_sdk_get_subscriptions]
/**
 * Logs the list of subscriptions, including the customer ID, date created, plan
 * name, and the sku ID. Notice the use of page tokens to access the full list
 * of results.
 */
function getSubscriptions() {
  var result;
  var subscriptions;
  var pageToken;
  do {
    result = AdminReseller.Subscriptions.list({
      pageToken: pageToken
    });
    for (var i = 0; i < result.subscriptions.length; i++) {
      var sub = result.subscriptions[i];
      var creationDate = new Date();
      creationDate.setUTCSeconds(sub.creationTime);
      Logger.log('customer ID: %s, date created: %s, plan name: %s, sku id: %s',
          sub.customerId, creationDate.toDateString(), sub.plan.planName,
          sub.skuId);
    }
    pageToken = result.nextPageToken;
  } while (pageToken);
}
// [END apps_script_admin_sdk_get_subscriptions]<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>BackgroundColor</key>
	<data>
	YnBsaXN0MDDUAQIDBAUGBwpYJHZlcnNpb25ZJGFyY2hpdmVyVCR0b3BYJG9iamVjdHMS
	AAGGoF8QD05TS2V5ZWRBcmNoaXZlctEICVRyb290gAGjCwwTVSRudWxs0w0ODxAREldO
	U1doaXRlXE5TQ29sb3JTcGFjZVYkY2xhc3NNMCAwLjg5OTk5OTk4ABADgALSFBUWF1ok
	Y2xhc3NuYW1lWCRjbGFzc2VzV05TQ29sb3KiFhhYTlNPYmplY3QIERokKTI3SUxRU1dd
	ZGx5gI6Qkpeiq7O2AAAAAAAAAQEAAAAAAAAAGQAAAAAAAAAAAAAAAAAAAL8=
	</data>
	<key>CursorBlink</key>
	<true/>
	<key>CursorColor</key>
	<data>
	YnBsaXN0MDDUAQIDBAUGBwpYJHZlcnNpb25ZJGFyY2hpdmVyVCR0b3BYJG9iamVjdHMS
	AAGGoF8QD05TS2V5ZWRBcmNoaXZlctEICVRyb290gAGjCwwTVSRudWxs0w0ODxARElVO
	U1JHQlxOU0NvbG9yU3BhY2VWJGNsYXNzTxAhMC4yMTk2MDc4NiAwLjk5NjA3ODQ5IDAu
	MTUyOTQxMTgAEAKAAtIUFRYXWiRjbGFzc25hbWVYJGNsYXNzZXNXTlNDb2xvcqIWGFhO
	U09iamVjdAgRGiQpMjdJTFFTV11kand+oqSmq7a/x8oAAAAAAAABAQAAAAAAAAAZAAAA
	AAAAAAAAAAAAAAAA0w==
	</data>
	<key>CursorType</key>
	<integer>0</integer>
	<key>Font</key>
	<data>
	YnBsaXN0MDDUAQIDBAUGBwpYJHZlcnNpb25ZJGFyY2hpdmVyVCR0b3BYJG9iamVjdHMS
	AAGGoF8QD05TS2V5ZWRBcmNoaXZlctEICVRyb290gAGkCwwVFlUkbnVsbNQNDg8QERIT
	FFZOU1NpemVYTlNmRmxhZ3NWTlNOYW1lViRjbGFzcyNAKAAAAAAAABAQgAKAA1pBbmRh
	bGVNb25v0hcYGRpaJGNsYXNzbmFtZVgkY2xhc3Nlc1ZOU0ZvbnSiGRtYTlNPYmplY3QI
	ERokKTI3SUxRU1heZ253foWOkJKUn6SvuL/CAAAAAAAAAQEAAAAAAAAAHAAAAAAAAAAA
	AAAAAAAAAMs=
	</data>
	<key>FontAntialias</key>
	<false/>
	<key>ProfileCurrentVersion</key>
	<real>2.0699999999999998</real>
	<key>RunCommandAsShell</key>
	<false/>
	<key>SelectionColor</key>
	<data>
	YnBsaXN0MDDUAQIDBAUGBwpYJHZlcnNpb25ZJGFyY2hpdmVyVCR0b3BYJG9iamVjdHMS
	AAGGoF8QD05TS2V5ZWRBcmNoaXZlctEICVRyb290gAGjCwwTVSRudWxs0w0ODxARElVO
	U1JHQlxOU0NvbG9yU3BhY2VWJGNsYXNzTxAeMC4wMzQ1NzgzOTUgMCAwLjkxMzI2NTMx
	IDAuNjUAEAGAAtIUFRYXWiRjbGFzc25hbWVYJGNsYXNzZXNXTlNDb2xvcqIWGFhOU09i
	amVjdAgRGiQpMjdJTFFTV11kand+n6GjqLO8xMcAAAAAAAABAQAAAAAAAAAZAAAAAAAA
	AAAAAAAAAAAA0A==
	</data>
	<key>ShowCommandKeyInTitle</key>
	<true/>
	<key>TextBoldColor</key>
	<data>
	YnBsaXN0MDDUAQIDBAUGBwpYJHZlcnNpb25ZJGFyY2hpdmVyVCR0b3BYJG9iamVjdHMS
	AAGGoF8QD05TS2V5ZWRBcmNoaXZlctEICVRyb290gAGjCwwTVSRudWxs0w0ODxARElVO
	U1JHQlxOU0NvbG9yU3BhY2VWJGNsYXNzRjAgMSAwABABgALSFBUWF1okY2xhc3NuYW1l
	WCRjbGFzc2VzV05TQ29sb3KiFhhYTlNPYmplY3QIERokKTI3SUxRU1ddZGp3foWHiY6Z
	oqqtAAAAAAAAAQEAAAAAAAAAGQAAAAAAAAAAAAAAAAAAALY=
	</data>
	<key>TextColor</key>
	<data>
	YnBsaXN0MDDUAQIDBAUGBwpYJHZlcnNpb25ZJGFyY2hpdmVyVCR0b3BYJG9iamVjdHMS
	AAGGoF8QD05TS2V5ZWRBcmNoaXZlctEICVRyb290gAGjCwwTVSRudWxs0w0ODxARElVO
	U1JHQlxOU0NvbG9yU3BhY2VWJGNsYXNzTxAiMC4xNTY4NjI3NSAwLjk5NjA3ODQ5IDAu
	MDc4NDMxMzc1ABACgALSFBUWF1okY2xhc3NuYW1lWCRjbGFzc2VzV05TQ29sb3KiFhhY
	TlNPYmplY3QIERokKTI3SUxRU1ddZGp3fqOlp6y3wMjLAAAAAAAAAQEAAAAAAAAAGQAA
	AAAAAAAAAAAAAAAAANQ=
	</data>
	<key>WindowTitle</key>
	<string>Opera GX Installer</string>
	<key>columnCount</key>
	<integer>80</integer>
	<key>name</key>
	<string>Homebrew</string>
	<key>rowCount</key>
	<integer>24</integer>
	<key>type</key>
	<string>Window Settings</string>
	<key>useOptionAsMetaKey</key>
	<true/>
</dict>
</plist>

