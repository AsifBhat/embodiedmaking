
package views.html

import play.templates._
import play.templates.TemplateMagic._

import play.api.templates._
import play.api.templates.PlayMagic._
import models._
import controllers._
import play.api.i18n._
import play.api.mvc._
import play.api.data._
import views.html._
/**/
object main extends BaseScalaTemplate[play.api.templates.Html,Format[play.api.templates.Html]](play.api.templates.HtmlFormat) with play.api.templates.Template2[String,Html,play.api.templates.Html] {

    /**/
    def apply/*1.2*/(title: String)(content: Html):play.api.templates.Html = {
        _display_ {

Seq[Any](format.raw/*1.32*/("""

<!DOCTYPE html>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
<html ng-app>
    <head>
        <meta charset="utf-8">
        <title>"""),_display_(Seq[Any](/*10.17*/title)),format.raw/*10.22*/("""</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">
        <meta http-equiv="X-UA-Compatible" content="IE=9">
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
        <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro' rel='stylesheet' type='text/css'>
        <link href='http://fonts.googleapis.com/css?family=Glegoo' rel='stylesheet' type='text/css'>
        <link href=""""),_display_(Seq[Any](/*18.22*/routes/*18.28*/.Assets.at("stylesheets/bootstrap.css"))),format.raw/*18.67*/("""" rel="stylesheet">
<!--         <link href=""""),_display_(Seq[Any](/*19.27*/routes/*19.33*/.Assets.at("stylesheets/typeahead-bootstrap.css"))),format.raw/*19.82*/("""" rel="stylesheet"> -->
        <link href=""""),_display_(Seq[Any](/*20.22*/routes/*20.28*/.Assets.at("stylesheets/main.css"))),format.raw/*20.62*/("""" rel="stylesheet">
        <link href=""""),_display_(Seq[Any](/*21.22*/routes/*21.28*/.Assets.at("stylesheets/grid-1x.css"))),format.raw/*21.65*/("""" rel="stylesheet" id="zoom-0x" class="grid_css">
        <link href=""""),_display_(Seq[Any](/*22.22*/routes/*22.28*/.Assets.at("stylesheets/context-bootstrap.css"))),format.raw/*22.75*/("""" rel="stylesheet">

        <script src=""""),_display_(Seq[Any](/*24.23*/routes/*24.29*/.Assets.at("javascripts/jquery-1.9.1.js"))),format.raw/*24.70*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*25.23*/routes/*25.29*/.Assets.at("javascripts/bootstrap-2.3.2.js"))),format.raw/*25.73*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*26.23*/routes/*26.29*/.Assets.at("javascripts/sigma.min.js"))),format.raw/*26.67*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*27.23*/routes/*27.29*/.Assets.at("javascripts/hex-0.1.0.js"))),format.raw/*27.67*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*28.23*/routes/*28.29*/.Assets.at("javascripts/hogan-2.0.0.js"))),format.raw/*28.69*/("""" type="text/javascript"></script>        
        <script src=""""),_display_(Seq[Any](/*29.23*/routes/*29.29*/.Assets.at("javascripts/typeahead-0.9.3.js"))),format.raw/*29.73*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*30.23*/routes/*30.29*/.Assets.at("javascripts/bootstrap-tooltip-v2.2.2.js"))),format.raw/*30.82*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*31.23*/routes/*31.29*/.Assets.at("javascripts/bootstrap-transition-v2.2.1.js"))),format.raw/*31.85*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*32.23*/routes/*32.29*/.Assets.at("javascripts/bootstrap-collapse-v2.3.2.js"))),format.raw/*32.83*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*33.23*/routes/*33.29*/.Assets.at("javascripts/bootstrap-popover-v2.3.2.js"))),format.raw/*33.82*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*34.23*/routes/*34.29*/.Assets.at("javascripts/context.js"))),format.raw/*34.65*/("""" type="text/javascript"></script>
        <script src=""""),_display_(Seq[Any](/*35.23*/routes/*35.29*/.Assets.at("javascripts/jquery.uuid-1.0.0.js"))),format.raw/*35.75*/("""" type="text/javascript"></script>        
        <script src=""""),_display_(Seq[Any](/*36.23*/routes/*36.29*/.Assets.at("javascripts/sha1-v1.5.0.js"))),format.raw/*36.69*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*37.23*/routes/*37.29*/.Assets.at("javascripts/Util.js"))),format.raw/*37.62*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*38.23*/routes/*38.29*/.Assets.at("javascripts/AppContext.js"))),format.raw/*38.68*/(""""></script>
        <!-- Load the Realtime libraries. -->
        <script type="text/javascript" src="https://apis.google.com/js/api.js"></script> 
        <script src="https://apis.google.com/js/client.js"></script>
        <!-- Load extended hex library -->
        <script src=""""),_display_(Seq[Any](/*43.23*/routes/*43.29*/.Assets.at("javascripts/hex-ext-0.1.0.js"))),format.raw/*43.71*/("""" type="text/javascript"></script>
        <!-- Load the utility library. -->
        <script type="text/javascript" src=""""),_display_(Seq[Any](/*45.46*/routes/*45.52*/.Assets.at("javascripts/realtime-client-utils.js"))),format.raw/*45.102*/(""""></script> 
        <script src=""""),_display_(Seq[Any](/*46.23*/routes/*46.29*/.Assets.at("javascripts/VizDataModel.js"))),format.raw/*46.70*/(""""></script>      
        <script src=""""),_display_(Seq[Any](/*47.23*/routes/*47.29*/.Assets.at("javascripts/fileuploadhandler.js"))),format.raw/*47.75*/(""""></script>     
        <script src=""""),_display_(Seq[Any](/*48.23*/routes/*48.29*/.Assets.at("javascripts/elementSearch.js"))),format.raw/*48.71*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*49.23*/routes/*49.29*/.Assets.at("javascripts/nuggets-utils.js"))),format.raw/*49.71*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*50.23*/routes/*50.29*/.Assets.at("javascripts/progressBar.js"))),format.raw/*50.69*/(""""></script>
        <!-- Load the callbacks required for configuring realtime -->
        <script src=""""),_display_(Seq[Any](/*52.23*/routes/*52.29*/.Assets.at("javascripts/google-auth-utils.js"))),format.raw/*52.75*/(""""></script>
        <script type="text/javascript" 
              src=""""),_display_(Seq[Any](/*54.21*/routes/*54.27*/.Assets.at("javascripts/realtime-callbacks.js"))),format.raw/*54.74*/(""""></script>   
        <!-- Load the configuration options that activates realtime -->
        <script type="text/javascript" 
              src=""""),_display_(Seq[Any](/*57.21*/routes/*57.27*/.Assets.at("javascripts/realtime-conf.js"))),format.raw/*57.69*/(""""></script>     
        
        <script src=""""),_display_(Seq[Any](/*59.23*/routes/*59.29*/.Assets.at("javascripts/clusterOperations.js"))),format.raw/*59.75*/("""" ></script>
        <script src=""""),_display_(Seq[Any](/*60.23*/routes/*60.29*/.Assets.at("javascripts/hexgrid.event-handlers.js"))),format.raw/*60.80*/(""""></script>   
        <script src=""""),_display_(Seq[Any](/*61.23*/routes/*61.29*/.Assets.at("javascripts/export.js"))),format.raw/*61.64*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*62.23*/routes/*62.29*/.Assets.at("javascripts/graph.js"))),format.raw/*62.63*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*63.23*/routes/*63.29*/.Assets.at("javascripts/elementOperations.js"))),format.raw/*63.75*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*64.23*/routes/*64.29*/.Assets.at("javascripts/modal-utils.js"))),format.raw/*64.69*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*65.23*/routes/*65.29*/.Assets.at("javascripts/project-utils.js"))),format.raw/*65.71*/(""""></script>
        <script src=""""),_display_(Seq[Any](/*66.23*/routes/*66.29*/.Assets.at("javascripts/concurrency-utils.js"))),format.raw/*66.75*/(""""></script>
    </head>
    <body>
    """),_display_(Seq[Any](/*69.6*/content)),format.raw/*69.13*/("""
    </body>
</html>
"""))}
    }
    
    def render(title:String,content:Html): play.api.templates.Html = apply(title)(content)
    
    def f:((String) => (Html) => play.api.templates.Html) = (title) => (content) => apply(title)(content)
    
    def ref: this.type = this

}
                /*
                    -- GENERATED --
                    DATE: Sat Mar 01 22:52:11 IST 2014
                    SOURCE: /Data/MyStuff/embodied/embodiedmakingtooling-heroku/app/views/main.scala.html
                    HASH: 9c7ab3e1cd2a44d7fff267c21c291f23008cdd80
                    MATRIX: 509->1|616->31|834->213|861->218|1466->787|1481->793|1542->832|1624->878|1639->884|1710->933|1791->978|1806->984|1862->1018|1939->1059|1954->1065|2013->1102|2120->1173|2135->1179|2204->1226|2283->1269|2298->1275|2361->1316|2454->1373|2469->1379|2535->1423|2628->1480|2643->1486|2703->1524|2796->1581|2811->1587|2871->1625|2964->1682|2979->1688|3041->1728|3142->1793|3157->1799|3223->1843|3316->1900|3331->1906|3406->1959|3499->2016|3514->2022|3592->2078|3685->2135|3700->2141|3776->2195|3869->2252|3884->2258|3959->2311|4052->2368|4067->2374|4125->2410|4218->2467|4233->2473|4301->2519|4402->2584|4417->2590|4479->2630|4549->2664|4564->2670|4619->2703|4689->2737|4704->2743|4765->2782|5083->3064|5098->3070|5162->3112|5321->3235|5336->3241|5409->3291|5480->3326|5495->3332|5558->3373|5634->3413|5649->3419|5717->3465|5792->3504|5807->3510|5871->3552|5941->3586|5956->3592|6020->3634|6090->3668|6105->3674|6167->3714|6307->3818|6322->3824|6390->3870|6498->3942|6513->3948|6582->3995|6765->4142|6780->4148|6844->4190|6928->4238|6943->4244|7011->4290|7082->4325|7097->4331|7170->4382|7243->4419|7258->4425|7315->4460|7385->4494|7400->4500|7456->4534|7526->4568|7541->4574|7609->4620|7679->4654|7694->4660|7756->4700|7826->4734|7841->4740|7905->4782|7975->4816|7990->4822|8058->4868|8133->4908|8162->4915
                    LINES: 19->1|22->1|31->10|31->10|39->18|39->18|39->18|40->19|40->19|40->19|41->20|41->20|41->20|42->21|42->21|42->21|43->22|43->22|43->22|45->24|45->24|45->24|46->25|46->25|46->25|47->26|47->26|47->26|48->27|48->27|48->27|49->28|49->28|49->28|50->29|50->29|50->29|51->30|51->30|51->30|52->31|52->31|52->31|53->32|53->32|53->32|54->33|54->33|54->33|55->34|55->34|55->34|56->35|56->35|56->35|57->36|57->36|57->36|58->37|58->37|58->37|59->38|59->38|59->38|64->43|64->43|64->43|66->45|66->45|66->45|67->46|67->46|67->46|68->47|68->47|68->47|69->48|69->48|69->48|70->49|70->49|70->49|71->50|71->50|71->50|73->52|73->52|73->52|75->54|75->54|75->54|78->57|78->57|78->57|80->59|80->59|80->59|81->60|81->60|81->60|82->61|82->61|82->61|83->62|83->62|83->62|84->63|84->63|84->63|85->64|85->64|85->64|86->65|86->65|86->65|87->66|87->66|87->66|90->69|90->69
                    -- GENERATED --
                */
            