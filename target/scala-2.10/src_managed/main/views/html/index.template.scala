
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
object index extends BaseScalaTemplate[play.api.templates.Html,Format[play.api.templates.Html]](play.api.templates.HtmlFormat) with play.api.templates.Template0[play.api.templates.Html] {

    /**/
    def apply():play.api.templates.Html = {
        _display_ {

Seq[Any](_display_(Seq[Any](/*1.2*/main("The Embodied Making Tool")/*1.34*/ {_display_(Seq[Any](format.raw/*1.36*/("""
<div class="row page-header">
  <!-- Holds only the Title bar for a given Making-->
  <div class="title_holder row">
    <div class="span1">
       <!-- <embed src="/assets/images/em-logo.svg" width="50" height="50" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install" viewBox="0 0 50 50"> </embed> -->
        <!-- <object data="http://localhost:9000/assets/images/em-logo.svg" width="110" height="60" type="image/svg+xml" codebase="http://www.savarese.com/software/svgplugin/"></object> -->
      <img src="/assets/images/em-logo.svg" class="emtool_logo">        
    </div>
    <div class="span9 proj_title_row" >
      <div class="proj_title" contenteditable="true"></div>
    </div>
    <!-- Controls for Various features go here-->
    <div id="element_controls" class="row">
      <ul class="nav nav-pills span">
        <li>
          <div id="nugget_btn" class="control_btn nuggets_icon"></div>
        </li>
        <li>
          <div class="control_btn">
            <div id="col_settings_gear" class="dropdown">
              <a class="dropdown-toggle sr-only" data-toggle="dropdown" data-target="#" href="."><i class="fa fa-gear fa-lg" id="settings_gear"></i>
              </a>
              <ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu1">
                <li role="presentation"><a role="menuitem" tabindex="-1" data-target="#" onclick='AppContext.exports.exportToGexf()'>Export GEXF</a></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" data-target="#" onclick='AppContext.exports.exportElements()'>Export Elements</a></li>
                <li role="presentation" class="divider"></li>
                <li role="presentation"><a role="menuitem" tabindex="-1" data-target="#" >Import Elements</a></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
      <div class="user_info_tag span2" >
        <svg class="svg-graphic pull-right" width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" version="1.1">
            <defs>
              <clipPath id="hex-clip">
                <polygon points="0 10, 20 0, 40 10, 40 30, 20 40, 0 30" /> 
               <!--  <circle cx="20" cy="20" r="20" /> -->
             </clipPath>
            </defs> 
          <image  contenteditable="true" id="profile_picture" style="display:none;" xlink:href="" width="40" height="40" clip-path="url(#hex-clip)"></image>
        </svg> 
        <!-- <img id="profile_picture" style="display:none"></img> -->
      </div> 
    </div> 
  </div>
  <div id="menubar">
      <button id="import_popover" data-placement="bottom" data-html= true data-toggle="popover" title="" data-original-title='<span class="icon-upload"></span><b>&nbsp;Import File</b> <span id="import_close" class="pull-right"><span class="icon-remove-circle"></span></span>' data-content='<div id="import_container"><div id="import_file"><div class="import_btn"><input type="file" name="importedFile" id="import_file_input"></div></div></div>' data-trigger="manual" data-animation="false" class="btn btn-mini btn-warning import_label"><span class="icon-upload"></span>&nbsp;Import</button>
    <button id='showGraph' class="btn btn-mini btn-warning" value='show' onclick='AppContext.graph.showGraph()'><span class="icon-eye-open"></span>&nbsp;Show Graph</button>
    
    <button id="authorizeButton" disabled class="login_button pull-right btn btn-primary btn-mini"><span class="icon-lock"></span>&nbsp;Login</button>
    <span class="hex-controller pull-right">
      <button id='reorient' class="btn btn-mini btn-warning" onclick='AppContext.grid.reorient()'><span class="icon-align-center"></span></button>
      <button class="btn btn-mini btn-warning" id="zoomin-controller"> <span class="zoom_controller icon-zoom-in"></span> </button>
      <button class="btn btn-mini btn-warning" id="zoomout-controller"> <span class="zoom_controller icon-zoom-out"></span> </button>
    </span>
  </div>
</div>

<div class="progress flash_board" id="progress_container">
  <div class="bar" id="progress_bar"></div>
  <br>
  <div class="text-left text-info" style="display:none"><strong>Loading File: </strong></div>
</div>
<div id="message_board" class="flash_board">
  <div id="message"></div>
</div>
<div id="graphContainer" style='display:none;'>
  <div id='graphView' style='display:none'>
    <div id='sig' class="sigma" style="height:100%;width:100%;"></div>
  </div>
 </div> 
<div id="desctooltip" style="height:10px;width:10px;" type="button" data-html="true" data-toggle="tooltip" data-placement="top" data-trigger="focus hover" data-animation="false"></div>
<div id="hexagonal-grid">
<div id="collaborator_pane" class="collab_pane"  onmouseover="loadCollabaorators()" onmouseout="removeCollabaorators()">
</div>
</div>



<div class="btn-group" id="addFromTypeahead" data-toggle="buttons-radio"  style='z-index:100;position:absolute;display:none;'>
 
  <a href="#" class="btn btn-default btn-mini " onClick='AppContext.cluster.addStory()'><i class="icon-plus icon-black"></i> Story</a>
  <a href="#" class="btn btn-default btn-mini " onClick='AppContext.cluster.addForce()'><i class="icon-plus icon-black"></i> Force</a>
  <a href="#" class="btn btn-default btn-mini " onClick='AppContext.cluster.addSolution()'><i class="icon-plus icon-black"></i> Solution</a>
</div>

<div id="edit_pane" class="cont_edit_pane rounded_border" style="display:none;">
</div>
<div class="edit_nuggets cont_edit_pane rounded_border" style="display:none;">
  <div id="ed_nuggets_header" class="ed_header row rounded_border">
    <div> <div class="nuggets_icon item_icon span"></div> <h6> Nuggets </h6></div>
  </div>
  <div id="ed_nuggets_body" class="ed_body row">
    <!-- Here comes the basic styling of all the nuggets. The idea is to append the nuggets using JS as they are pulled from the Google RT-API.-->
    <div class="add_nugget_section nugget_view row">
      <span class="add_nugget_icon span"><h3>+</h3></span>
      <div class="add_section_text span">Click here to add a new Nugget</div>
    </div>
    <div class="nugget_search nugget_view">
      <input type="text" id="input-nugget-search" name="query" placeholder="Search Nuggets...">
    </div> 
    <div class="nugget_desc nugget_view" contenteditable="true"></div>
    <div class="add_nugget_control" style="display: none"> 
      <span class="close_add_nugget"><i class="icon-remove"></i></span>
      <textarea id="add_nugget_textarea" placeholder="Type Here and Hit 'enter' key to save and exit.." rows="3"></textarea>
    </div>
  </div>
</div>


""")))})),format.raw/*113.2*/("""
"""))}
    }
    
    def render(): play.api.templates.Html = apply()
    
    def f:(() => play.api.templates.Html) = () => apply()
    
    def ref: this.type = this

}
                /*
                    -- GENERATED --
                    DATE: Sun Mar 02 14:04:43 IST 2014
                    SOURCE: /Data/MyStuff/embodied/embodiedmakingtooling-heroku/app/views/index.scala.html
                    HASH: 98e01010a6abba44b6d19cc4ef6d79199dc420f7
                    MATRIX: 578->1|618->33|657->35|7323->6669
                    LINES: 22->1|22->1|22->1|134->113
                    -- GENERATED --
                */
            