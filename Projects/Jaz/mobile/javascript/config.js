	var aliasConfig = {
appName : ["", "", ""],
totalPageCount : [],
largePageWidth : [],
largePageHeight : [],
normalPath : [],
largePath : [],
thumbPath : [],

ToolBarsSettings:[],
TitleBar:[],
appLogoIcon:["appLogoIcon"],
appLogoLinkURL:["appLogoLinkURL"],
bookTitle : [],
bookDescription : [],
ButtonsBar : [],
ShareButton : [],
ShareButtonVisible : ["socialShareButtonVisible"],
ThumbnailsButton : [],
ThumbnailsButtonVisible : ["enableThumbnail"],
ZoomButton : [],
ZoomButtonVisible : ["enableZoomIn"],
FlashDisplaySettings : [],
MainBgConfig : [],
bgBeginColor : ["bgBeginColor"],
bgEndColor : ["bgEndColor"],
bgMRotation : ["bgMRotation"],
backGroundImgURL : ["mainbgImgUrl","innerMainbgImgUrl"],
pageBackgroundColor : ["pageBackgroundColor"],
flipshortcutbutton : [],
BookMargins : [],
topMargin : [],
bottomMargin : [],
leftMargin : [],
rightMargin : [],
HTMLControlSettings : [],
linkconfig : [],
LinkDownColor : ["linkOverColor"],
LinkAlpha : ["linkOverColorAlpha"],
OpenWindow : ["linkOpenedWindow"],
searchColor : [],
searchAlpha : [],
SearchButtonVisible : ["searchButtonVisible"],

productName : [],
homePage : [],
enableAutoPlay : ["autoPlayAutoStart"],
autoPlayDuration : ["autoPlayDuration"],
autoPlayLoopCount : ["autoPlayLoopCount"],
BookMarkButtonVisible : [],
googleAnalyticsID : ["googleAnalyticsID"],
OriginPageIndex : [],	
HardPageEnable : ["isHardCover"],	
UIBaseURL : [],	
RightToLeft: ["isRightToLeft"],	

LeftShadowWidth : ["leftPageShadowWidth"],	
LeftShadowAlpha : ["pageShadowAlpha"],
RightShadowWidth : ["rightPageShadowWidth"],
RightShadowAlpha : ["pageShadowAlpha"],
ShortcutButtonHeight : [],	
ShortcutButtonWidth : [],
AutoPlayButtonVisible : ["enableAutoPlay"],	
DownloadButtonVisible : ["enableDownload"],	
DownloadURL : ["downloadURL"],
HomeButtonVisible :["homeButtonVisible"],
HomeURL:['btnHomeURL'],
BackgroundSoundURL:['bacgroundSoundURL'],
//TableOfContentButtonVisible:["BookMarkButtonVisible"],
PrintButtonVisible:["enablePrint"],
toolbarColor:["mainColor","barColor"],
loadingBackground:["mainColor","barColor"],
BackgroundSoundButtonVisible:["enableFlipSound"],
FlipSound:["enableFlipSound"],
MiniStyle:["userSmallMode"],
retainBookCenter:["moveFlipBookToCenter"],
totalPagesCaption:["totalPageNumberCaptionStr"],
pageNumberCaption:["pageIndexCaptionStrs"]
};
var aliasLanguage={
frmPrintbtn:["frmPrintCaption"],
frmPrintall : ["frmPrintPrintAll"],
frmPrintcurrent : ["frmPrintPrintCurrentPage"],
frmPrintRange : ["frmPrintPrintRange"],
frmPrintexample : ["frmPrintExampleCaption"],
btnLanguage:["btnSwicthLanguage"],
btnTableOfContent:["btnBookMark"]
}
;
	var bookConfig = {
	appName:'flippdf',
	totalPageCount : 0,
	largePageWidth : 1080,
	largePageHeight : 1440,
	normalPath : "files/page/",
	largePath : "files/large/",
	thumbPath : "files/thumb/",
	
	ToolBarsSettings:"",
	TitleBar:"",
	appLogoLinkURL:"",
	bookTitle:"FLIPBUILDER",
	bookDescription:"",
	ButtonsBar:"",
	ShareButton:"",
	
	ThumbnailsButton:"",
	ThumbnailsButtonVisible:"Show",
	ZoomButton:"",
	ZoomButtonVisible:"Yes",
	FlashDisplaySettings:"",
	MainBgConfig:"",
	bgBeginColor:"#cccccc",
	bgEndColor:"#eeeeee",
	bgMRotation:45,
	pageBackgroundColor:"#FFFFFF",
	flipshortcutbutton:"Show",
	BookMargins:"",
	topMargin:10,
	bottomMargin:10,
	leftMargin:10,
	rightMargin:10,
	HTMLControlSettings:"",
	linkconfig:"",
	LinkDownColor:"#808080",
	LinkAlpha:0.5,
	OpenWindow:"_Blank",

	BookMarkButtonVisible:'true',
	productName : 'Demo created by Flip PDF',
	homePage : 'http://www.flipbuilder.com/',
	isFlipPdf : "true",
	TableOfContentButtonVisible:"true",
	searchTextJS:'javascript/search_config.js',
	searchPositionJS:undefined
};
	
	
	;bookConfig.BookTemplateName="metro";bookConfig.loadingCaptionColor="#DDDDDD";bookConfig.loadingBackground="#323232";bookConfig.appLogoOpenWindow="Blank";bookConfig.logoHeight="40";bookConfig.logoPadding="0";bookConfig.logoTop="0";bookConfig.toolbarColor="#FFD700";bookConfig.iconColor="#000000";bookConfig.pageNumColor="#000000";bookConfig.iconFontColor="#000000";bookConfig.toolbarAlwaysShow="No";bookConfig.formFontColor="#000000";bookConfig.formBackgroundColor="#000000";bookConfig.ToolBarAlpha="1";bookConfig.CurlingPageCorner="Yes";bookConfig.showBookInstructionOnStart="false";bookConfig.InstructionsButtonVisible="Show";bookConfig.showInstructionOnStart="No";bookConfig.showGotoButtonsAtFirst="No";bookConfig.QRCode="Hide";bookConfig.HomeButtonVisible="Hide";bookConfig.HomeURL="%first page%";bookConfig.aboutButtonVisible="Hide";bookConfig.enablePageBack="Show";bookConfig.ShareButtonVisible="Show";shareObj = [];bookConfig.isInsertFrameLinkEnable="Show";bookConfig.addCurrentPage="No";bookConfig.EmailButtonVisible="Show";bookConfig.btnShareWithEmailBody="{link}";bookConfig.ThumbnailsButtonVisible="Show";bookConfig.thumbnailColor="#333333";bookConfig.thumbnailAlpha="70";bookConfig.BookMarkButtonVisible="Hide";bookConfig.TableOfContentButtonVisible="Show";bookConfig.isHideTabelOfContentNodes="yes";bookConfig.SearchButtonVisible="Show";bookConfig.leastSearchChar="3";bookConfig.searchKeywordFontColor="#FFB000";bookConfig.searchHightlightColor="#ffff00";bookConfig.SelectTextButtonVisible="Show";bookConfig.PrintButtonVisible="Show";bookConfig.BackgroundSoundButtonVisible="Show";bookConfig.FlipSound="Yes";bookConfig.BackgroundSoundURL="../files/mobile-ext/BackgroundSoundURL.mp3";bookConfig.BackgroundSoundLoop="-1";bookConfig.AutoPlayButtonVisible="Show";bookConfig.autoPlayAutoStart="No";bookConfig.autoPlayDuration="9";bookConfig.autoPlayLoopCount="1";bookConfig.ZoomButtonVisible="Show";bookConfig.maxZoomWidth="1400";bookConfig.defaultZoomWidth="700";bookConfig.mouseWheelFlip="Yes";bookConfig.ZoomMapVisible="Hide";bookConfig.DownloadButtonVisible="Hide";bookConfig.PhoneButtonVisible="Hide";bookConfig.AnnotationButtonVisible="Hide";bookConfig.FullscreenButtonVisible="Show";bookConfig.MagnifierButtonVisible="Hide";bookConfig.bgBeginColor="#7bb6dc";bookConfig.bgEndColor="#82d0e8";bookConfig.bgMRotation="-90";bookConfig.backGroundImgURL="../files/mobile-ext/backGroundImgURL.jpg";bookConfig.backgroundPosition="stretch";bookConfig.backgroundOpacity="100";bookConfig.backgroundScene="None";bookConfig.LeftShadowWidth="90";bookConfig.LeftShadowAlpha="0.6";bookConfig.RightShadowWidth="55";bookConfig.RightShadowAlpha="0.6";bookConfig.ShowTopLeftShadow="Yes";bookConfig.HardPageEnable="Yes";bookConfig.hardCoverBorderWidth="8";bookConfig.borderColor="#FFD700";bookConfig.outerCoverBorder="Yes";bookConfig.cornerRound="8";bookConfig.leftMarginOnMobile="0";bookConfig.topMarginOnMobile="0";bookConfig.rightMarginOnMobile="0";bookConfig.bottomMarginOnMobile="0";bookConfig.pageBackgroundColor="#FFFFFF";bookConfig.flipshortcutbutton="Show";bookConfig.BindingType="side";bookConfig.RightToLeft="No";bookConfig.FlipDirection="0";bookConfig.flippingTime="0.6";bookConfig.retainBookCenter="Yes";bookConfig.FlipStyle="Flip";bookConfig.autoDoublePage="Yes";bookConfig.isTheBookOpen="No";bookConfig.thicknessWidthType="Thinner";bookConfig.thicknessColor="#ffffff";bookConfig.SingleModeBanFlipToLastPage="No";bookConfig.showThicknessOnMobile="No";bookConfig.isSingleBookFullWindowOnMobile="no";bookConfig.isStopMouseMenu="yes";bookConfig.restorePageVisible="No";bookConfig.topMargin="10";bookConfig.bottomMargin="10";bookConfig.leftMargin="20";bookConfig.rightMargin="20";bookConfig.hideMiniFullscreen="no";bookConfig.maxWidthToSmallMode="400";bookConfig.maxHeightToSmallMode="300";bookConfig.leftRightPnlShowOption="None";bookConfig.highDefinitionConversion="yes";bookConfig.LargeLogoPosition="top-left";bookConfig.LargeLogoTarget="Blank";bookConfig.isFixLogoSize="No";bookConfig.logoFixWidth="0";bookConfig.logoFixHeight="0";bookConfig.SupportOperatePageZoom="Yes";bookConfig.showHelpContentAtFirst="No";bookConfig.updateURLForPage="No";bookConfig.LinkDownColor="#800080";bookConfig.LinkAlpha="0.2";bookConfig.OpenWindow="Blank";bookConfig.showLinkHint="No";bookConfig.MidBgColor="#760266";bookConfig.useTheAliCloudChart ="no";bookConfig.totalPageCount=8;bookConfig.largePageWidth=1800;bookConfig.largePageHeight=1401;;bookConfig.securityType="1";bookConfig.CreatedTime ="241231224304";bookConfig.bookTitle="Happy NewYear Jaz";bookConfig.bookmarkCR="5a36dd17a7b843c35258ced7d2ce512f668e32d0";bookConfig.productName="Flip PDF Professional";bookConfig.homePage="http://www.flipbuilder.com";bookConfig.searchPositionJS="javascript/text_position[1].js";bookConfig.searchTextJS="javascript/search_config.js";bookConfig.normalPath="../files/mobile/";bookConfig.largePath="../files/mobile/";bookConfig.thumbPath="../files/thumb/";bookConfig.userListPath="../files/extfiles/users.js";var language = [];;function orgt(s){ return binl2hex(core_hx(str2binl(s), s.length * chrsz));};; var pageEditor = {"setting":{"annoPlaying":"true","shoppingCartHTML":"false","shoppingCartOptinon":{"type":"PayPal","paypal":"","method":"POST","sandbox":"false","address":"","theme":"","body":"Hi xxx     I'm going to buy below product(s):      ${shopping}  Full Name","showPrice":"true","showTime":"true"}}, "pageAnnos":[[{"annotype":"com.mobiano.flipbook.pageeditor.TAnnoSWF","annoId":"202431224572368","alpha":"1","location":{"tannoName":"swf2","x":"0.005763688760806916","y":"-0.005555555555555556","width":"1.2507204610951008","height":"1.0112962962962964","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"swfURL":"./files/pageConfig/snow11.swf"}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoDynamicText","annoId":"202431224579660","alpha":"1","HRate":"0","location":{"tannoName":"text1","x":"-0.002881844380403458","y":"0.4203703703703704","width":"0.39214697406340054","height":"0.19092592592592592","rotation":"0","reflection":"true","reflectionType":"6","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"1","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"0","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"highlightsBool":"true","highlightsURL":"","highlightsLabel":"None","strText":"<TEXTFORMAT LEADING=\"11\"><P ALIGN=\"CENTER\"><FONT FACE=\"方正正纤黑简体\" SIZE=\"20\" COLOR=\"#FFD700\" LETTERSPACING=\"0\" KERNING=\"0\">Every new year is a chance to turn dreams into plans, so make sure that this new year be full of dreams and the will to make it true Jaz</FONT></P></TEXTFORMAT>","textStr":"<TEXTFORMAT LEADING=\"11\"><P ALIGN=\"CENTER\"><FONT FACE=\"方正正纤黑简体\" SIZE=\"20\" COLOR=\"#FFD700\" LETTERSPACING=\"0\" KERNING=\"0\">Every new year is a chance to turn dreams into plans, so make sure that this new year be full of dreams and the will to make it true Jaz</FONT></P></TEXTFORMAT>","format":{"htmlText":"<TEXTFORMAT LEADING=\"11\"><P ALIGN=\"CENTER\"><FONT FACE=\"方正正纤黑简体\" SIZE=\"20\" COLOR=\"#FFD700\" LETTERSPACING=\"0\" KERNING=\"0\">Every new year is a chance to turn dreams into plans, so make sure that this new year be full of dreams and the will to make it true Jaz</FONT></P></TEXTFORMAT>","pageH":"540","pageW":"694","font":"Tahoma","size":"12","color":"0","bold":"false","italic":"false","align":"left"},"repeat":"true","moveSpeed":"1"}],[{"annotype":"com.mobiano.flipbook.pageeditor.textAnim::TAnnoTextAnim","annoId":"20243122457548","alpha":"1","effectType":"Letter Spacing","location":{"tannoName":"text1","x":"0.12680115273775217","y":"0.362962962962963","width":"0.7752161383285303","height":"0.14814814814814814","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"0","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"highlightsBool":"false","selectable":"false","textStr":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Tahoma,Arial,Verdana\" SIZE=\"18\" COLOR=\"#663333\" LETTERSPACING=\"0\" KERNING=\"0\"><B>This New Year, I want you to know you’re  my whole world. Thank you for being my light in every dark moment. Happy New Year, Babe!!</B></FONT></P></TEXTFORMAT>","lineHeightRation":"0","formats":{"defaultFormat":{"htmlText":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Tahoma,Arial,Verdana\" SIZE=\"18\" COLOR=\"#663333\" LETTERSPACING=\"0\" KERNING=\"0\"><B>This New Year, I want you to know you’re  my whole world. Thank you for being my light in every dark moment. Happy New Year, Babe!!</B></FONT></P></TEXTFORMAT>","pageH":"540","pageW":"694"}},"background":{"alpha":"0.7","fillBg":"false","color":"16777215"}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoDynamicText","annoId":"202431224571251","alpha":"1","HRate":"0","location":{"tannoName":"text1","x":"0.15129682997118155","y":"0.412962962962963","width":"0.7193804034582133","height":"0.14444444444444443","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"0","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"highlightsBool":"false","strText":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Tahoma,Arial,Verdana,_sans\" SIZE=\"17\" COLOR=\"#FFFF00\" LETTERSPACING=\"0\" KERNING=\"0\">Every sunrise brings a chance to begin again, and every New Year gives us a chance to dream bigger. May your year be filled with all the joy you bring into my life, Jaz</FONT></P></TEXTFORMAT>","textStr":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Tahoma,Arial,Verdana,_sans\" SIZE=\"17\" COLOR=\"#FFFF00\" LETTERSPACING=\"0\" KERNING=\"0\">Every sunrise brings a chance to begin again, and every New Year gives us a chance to dream bigger. May your year be filled with all the joy you bring into my life, Jaz</FONT></P></TEXTFORMAT>","format":{"htmlText":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Tahoma,Arial,Verdana,_sans\" SIZE=\"17\" COLOR=\"#FFFF00\" LETTERSPACING=\"0\" KERNING=\"0\">Every sunrise brings a chance to begin again, and every New Year gives us a chance to dream bigger. May your year be filled with all the joy you bring into my life, Jaz</FONT></P></TEXTFORMAT>","pageH":"540","pageW":"694","font":"Tahoma","size":"12","color":"0","bold":"false","italic":"false","align":"left"},"repeat":"true","moveSpeed":"1"}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoDynamicText","annoId":"202431224574131","alpha":"1","HRate":"0","location":{"tannoName":"text1","x":"0.1484149855907781","y":"0.25","width":"0.6815561959654178","height":"0.3111111111111111","rotation":"0","reflection":"true","reflectionType":"1","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"0","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"highlightsBool":"false","strText":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Tahoma,Arial,Verdana\" SIZE=\"19\" COLOR=\"#663333\" LETTERSPACING=\"0\" KERNING=\"0\">For you, who paints my life in the most beautiful colors—may this New Year return the favor and make all your dreams come true. Happy New Year!</FONT></P></TEXTFORMAT>","textStr":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Tahoma,Arial,Verdana\" SIZE=\"19\" COLOR=\"#663333\" LETTERSPACING=\"0\" KERNING=\"0\">For you, who paints my life in the most beautiful colors—may this New Year return the favor and make all your dreams come true. Happy New Year!</FONT></P></TEXTFORMAT>","format":{"htmlText":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Tahoma,Arial,Verdana\" SIZE=\"19\" COLOR=\"#663333\" LETTERSPACING=\"0\" KERNING=\"0\">For you, who paints my life in the most beautiful colors—may this New Year return the favor and make all your dreams come true. Happy New Year!</FONT></P></TEXTFORMAT>","pageH":"540","pageW":"694","font":"Tahoma","size":"12","color":"0","bold":"false","italic":"false","align":"left"},"repeat":"true","moveSpeed":"1"}],[{"annotype":"com.mobiano.flipbook.pageeditor.textAnim::TAnnoTextAnim","annoId":"202431224573070","alpha":"1","effectType":"Default","location":{"tannoName":"text1","x":"0.05763688760806916","y":"0.3907407407407407","width":"0.9350864553314122","height":"0.24222222222222226","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"0","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"highlightsBool":"false","selectable":"false","textStr":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"LEFT\"><FONT FACE=\"Tahoma,Arial,Verdana\" SIZE=\"16\" COLOR=\"#FFD700\" LETTERSPACING=\"0\" KERNING=\"0\"><B>A Person like you is a treasure beyond measure. As we step into the New Year, know that I cherish you more than words can say. Here’s to another year of unforgettable memories!</B></FONT></P></TEXTFORMAT>","lineHeightRation":"0.045696999999999995","formats":{"defaultFormat":{"htmlText":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"LEFT\"><FONT FACE=\"Tahoma,Arial,Verdana\" SIZE=\"16\" COLOR=\"#FFD700\" LETTERSPACING=\"0\" KERNING=\"0\"><B>A Person like you is a treasure beyond measure. As we step into the New Year, know that I cherish you more than words can say. Here’s to another year of unforgettable memories!</B></FONT></P></TEXTFORMAT>","pageH":"540","pageW":"694"}},"background":{"alpha":"0.7","fillBg":"false","color":"16777215"}}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoDynamicText","annoId":"202431224575984","alpha":"1","HRate":"0","location":{"tannoName":"text1","x":"0.06340057636887608","y":"0.16296296296296298","width":"0.5880403458213257","height":"0.7690740740740741","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"1","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"0","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"highlightsBool":"false","strText":"<TEXTFORMAT LEADING=\"11\"><P ALIGN=\"CENTER\"><FONT FACE=\"方正正纤黑简体\" SIZE=\"18\" COLOR=\"#663333\" LETTERSPACING=\"0\" KERNING=\"0\"><B>With every laugh we’ve shared and every smile and pleasing moment , you’ve proven that u are a bless for any one who knows you.this why am  wishing you a New Year as amazing as you are, Jazmine!</B></FONT></P></TEXTFORMAT>","textStr":"<TEXTFORMAT LEADING=\"11\"><P ALIGN=\"CENTER\"><FONT FACE=\"方正正纤黑简体\" SIZE=\"18\" COLOR=\"#663333\" LETTERSPACING=\"0\" KERNING=\"0\"><B>With every laugh we’ve shared and every smile and pleasing moment , you’ve proven that u are a bless for any one who knows you.this why am  wishing you a New Year as amazing as you are, Jazmine!</B></FONT></P></TEXTFORMAT>","format":{"htmlText":"<TEXTFORMAT LEADING=\"11\"><P ALIGN=\"CENTER\"><FONT FACE=\"方正正纤黑简体\" SIZE=\"18\" COLOR=\"#663333\" LETTERSPACING=\"0\" KERNING=\"0\"><B>With every laugh we’ve shared and every smile and pleasing moment , you’ve proven that u are a bless for any one who knows you.this why am  wishing you a New Year as amazing as you are, Jazmine!</B></FONT></P></TEXTFORMAT>","pageH":"540","pageW":"694","font":"Tahoma","size":"12","color":"0","bold":"false","italic":"false","align":"left"},"repeat":"true","moveSpeed":"0.5"},{"annotype":"com.mobiano.flipbook.pageeditor.TAnnoSWF","annoId":"202431224578590","alpha":"1","location":{"tannoName":"swf1","x":"0.7118155619596542","y":"-0.0060185185185185185","width":"0.29265129682997115","height":"0.990925925925926","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"swfURL":"null"}],[{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoText","annoId":"202431224573783","alpha":"1","location":{"tannoName":"text1","x":"0.622478386167147","y":"0.9111111111111112","width":"0.362536023054755","height":"0.1137962962962963","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"1","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"highlightsBool":"true","highlightsURL":"","highlightsLabel":"None","selectable":"false","auto":"false","textStr":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Blackadder ITC\" SIZE=\"20\" COLOR=\"#FFFFFF\" LETTERSPACING=\"0\" KERNING=\"0\"><B>With all the love i have for you </B></FONT></P></TEXTFORMAT>","lineHeightRation":"0.045696999999999995","formats":{"defaultFormat":{"htmlText":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Blackadder ITC\" SIZE=\"20\" COLOR=\"#FFFFFF\" LETTERSPACING=\"0\" KERNING=\"0\"><B>With all the love i have for you </B></FONT></P></TEXTFORMAT>","pageH":"540","pageW":"694"}},"background":{"alpha":"0","fillBg":"false","color":"16777215"}},{"annotype":"com.mobiano.flipbook.pageeditor.shapes::TAnnoRectangle","annoId":"202431224573228","alpha":"1","spType":"null","fillStyle":"Pure","color":"16750899","gradientColorA":"16750899","gradientColorB":"13421772","angle":"90","spalpha":"1","borderWidth":"1","borderColor":"16763904","borderAlpha":"0","round":"false","ellipseWidth":"5","ellipseHeight":"5","triangleRight":"false","triangleLeft":"false","arrowWidth":"60","arrowTailHeight":"40","arrowType":"false","crossWidht":"40","crossType":"false","cylinderRadius":"60","bottomLength":"80","location":{"tannoName":"shape1","x":"0.329971181556196","y":"0.8240740740740741","width":"0.27953890489913547","height":"0.07592592592592592","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"}},{"annotype":"com.mobiano.flipbook.pageeditor::TAnnoText","annoId":"202431224574290","alpha":"1","location":{"tannoName":"text1","x":"0.37896253602305474","y":"0.8296296296296296","width":"0.19164265129682992","height":"0.06111111111111111","rotation":"0","reflection":"false","reflectionType":"0","reflectionAlpha":"0","pageWidth":"694","pageHeight":"540"},"hint":{"hintShapeColor":"0","hintShapeColor2":"8388736","hintShapeAlpha":"1","hintW":"0","hintH":"0","hintAuto":"true","hintShapeType":"2","text":""},"shadow":{"hasDropShadow":"false","shadowDistance":"4","shadowAngle":"270","shadowColor":"0","shadowAlpha":"0.6","shadowBlurX":"4","shadowBlurY":"4"},"highlightsBool":"false","selectable":"false","auto":"true","textStr":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Arial Black\" SIZE=\"16\" COLOR=\"#000000\" LETTERSPACING=\"0\" KERNING=\"0\"><B>Jazmine</B></FONT></P></TEXTFORMAT>","lineHeightRation":"0.045696999999999995","formats":{"defaultFormat":{"htmlText":"<TEXTFORMAT LEADING=\"5\"><P ALIGN=\"CENTER\"><FONT FACE=\"Arial Black\" SIZE=\"16\" COLOR=\"#000000\" LETTERSPACING=\"0\" KERNING=\"0\"><B>Jazmine</B></FONT></P></TEXTFORMAT>","pageH":"540","pageW":"694"}},"background":{"alpha":"0","fillBg":"false","color":"16777215"}}]]}; bookConfig.isFlipPdf=true; var pages_information =[{pageColor:"65433",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"},{pageColor:"16777215",pageIsStrech:"no"}];	
	if(language&&language.length>0&&language[0]&&language[0].language){
		bookConfig.language=language[0].language;
	}
	
try{
	for(var i=0;pageEditor!=undefined&&i<pageEditor.length;i++){
		if(pageEditor[i].length==0){
			continue;
		}
		for(var j=0;j<pageEditor[i].length;j++){
			var anno=pageEditor[i][j];
			if(anno==undefined)continue;
			if(anno.overAlpha==undefined){
				anno.overAlpha=bookConfig.LinkAlpha;
			}
			if(anno.outAlpha==undefined){
				anno.outAlpha=0;
			}
			if(anno.downAlpha==undefined){
				anno.downAlpha=bookConfig.LinkAlpha;
			}
			if(anno.overColor==undefined){
				anno.overColor=bookConfig.LinkDownColor;
			}
			if(anno.downColor==undefined){
				anno.downColor=bookConfig.LinkDownColor;
			}
			if(anno.outColor==undefined){
				anno.outColor=bookConfig.LinkDownColor;
			}
			if(anno.annotype=='com.mobiano.flipbook.pageeditor.TAnnoLink'){
				anno.alpha=bookConfig.LinkAlpha;
			}
		}
	}
}catch(e){
}
try{
	$.browser.device = 2;
}catch(ee){
}