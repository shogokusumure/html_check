/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** complete image size Extension
    complete image size
*/
define(function (require, exports, module) {
    'use strict';

  var CommandManager    = brackets.getModule("command/CommandManager");
  var Menus             = brackets.getModule("command/Menus");
  var KeyBindingManager = brackets.getModule("command/KeyBindingManager");
  var EditorManager     = brackets.getModule("editor/EditorManager");
  var DocumentManager   = brackets.getModule("document/DocumentManager");
  var FileUtils         = brackets.getModule("file/FileUtils");
  var ProjectManager    = brackets.getModule("project/ProjectManager");

  var COMMAND_ID  = "checkhtml.complete";
  var COMMAND_NAME = "complete";



  function completeImageSize() {
    //必要な情報をまとめる変数
    var Manager = {};

    //現在のドキュメントを取得
    Manager.currentDoc = DocumentManager.getCurrentDocument();
    // //現在のエディタを取得
    // Manager.editor = EditorManager.getCurrentFullEditor();

    // //プロジェクトのパスを取得
    // Manager.projectRootPath = ProjectManager.getProjectRoot().fullPath;
    // //開いているドキュメントのパスを取得
    // Manager.documentPath = Manager.currentDoc.file.parentPath;

    // //カーソルの位置
    // Manager.pos = Manager.editor.getCursorPos();

    //カーソルがある行のテキスト
    // Manager.lineText = Manager.currentDoc.getLine(Manager.pos.line);

    i = 0;
    var parse_txt;
    var txtlen;
    while (true) {
        // １行ずつテキスト読み込み。undefinedがあれば終わり
        Manager.lineText = Manager.currentDoc.getLine(i);
        if (Manager.lineText == undefined){
          break;
        }
        parse_txt = Manager.lineText

        // １行が全部スペースならスペースを削除する関数
        deleteSpace_line(parse_txt,Manager,i);

		// 行末のスペースを発見したら削除する関数
        deleteSpace_line_last(parse_txt,Manager,i);

        // 行内に不穏なスペースを発見したら警告する関数
        // alert_unrest_space(parse_txt,Manager,i);


        i += 1;
    }
  }
  var j;
  function deleteSpace_line(txt,all_txt,currentLine){
	var currentDoc = all_txt.currentDoc;
    var flg = 0
    var txtlen = txt.length;
	// 行に半角スペースしかなかったらflgはそのまま、それ以外があればflgを更新
    for(j = 0; j < txtlen; j++ ){
      if(txt[j] != " "){
		  flg = 1;
	  }
    }
	// 行に半角スペースしかなかったらテキストを置換してスペースを削除
	if(flg == 0){
		var start = {
        	line: currentLine,
        	ch: 0
    	};
      	var end = {
          	line: currentLine,
          	ch: txtlen
      	};
      	currentDoc.replaceRange("", start, end);
	}
  }

  function deleteSpace_line_last(txt,all_txt,currentLine){
	var currentDoc = all_txt.currentDoc;
    var flg = 0
    var txtlen = txt.length;
	// 行末に半角スペースがあればflgを更新
    if(txt[txtlen-1] == " " | txt[txtlen-1] == "　"){
        flg = 1;
    }
	// 行末から半角スペースが何文字あるか探いて、スペースを削除
    var space_len = 0;
    var count = txtlen - 1;
    if(flg == 1){
        while(true){
            if(txt[count] == " " | txt[count] == "　"){
                space_len +=1;
            }else if(count == 0){
                break;
            }else{
                break;
            }
            count = count-1;
        }
        var start = {
        	line: currentLine,
        	ch: 0
    	};
      	var end = {
          	line: currentLine,
          	ch: txtlen
      	};
        currentDoc.replaceRange(txt.slice(0,space_len*-1), start, end);
    }
  }

//   function alert_unrest_space(txt,all_txt,currentLine){
// 	var currentDoc = all_txt.currentDoc;
//     var pattern = ""

//   }

  //コマンドを登録
  CommandManager.register(COMMAND_NAME, COMMAND_ID, completeImageSize);

  //キーバインドの設定
  KeyBindingManager.addBinding(COMMAND_ID, 'Cmd-Ctrl-Space');

});