/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

if (typeof process !== "undefined") {
    require("../../support/paths");
    require("ace/test/mockdom");
}

define(function(require, exports, module) {
    
var assert = require("ace/test/assertions");
var Buffer = require("ace/model/buffer").Buffer;
var TextLayer = require("ace/view/layer/text").Text;
var JavaScriptMode = require("ace/mode/javascript").Mode;

module.exports = {

    "test: render line with hard tabs should render the same as lines with soft tabs" : function() {
        var session = new Buffer("a\ta\ta\t\na   a   a   \n");
        session.setMode(new JavaScriptMode());
        var textLayer = new TextLayer(document.createElement("div"));
        textLayer.setSession(session);
        textLayer.$computeTabString();
        // TODO refactor
        textLayer.config = {
            characterWidth: 10,
            lineHeight: 20
        };
        
        // row with hard tabs
        var row = 0;
        var tokens = session.getTokens(row, row)[0].tokens;
        var stringBuilder = [];
        textLayer.$renderLine(stringBuilder, row, tokens);
        
        // row with soft tabs
        row = 1;
        tokens = session.getTokens(row, row)[0].tokens;
        var stringBuilder2 = [];
        textLayer.$renderLine(stringBuilder2, row, tokens);
        assert.equal(stringBuilder.join(""), stringBuilder2.join(""));
    }
};

});

if (typeof module !== "undefined" && module === require.main) {
    require("asyncjs").test.testcase(module.exports).exec()
}