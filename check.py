# -*- coding: utf-8 -*-

import re

patternA = r">*?\s</|>*?　</" # 正規表現のルール。</の前のスペース検知
patternB = r"-->"

#-- 説明文 ココカラ --
frame = u"--"
description = [
    u"HTMLの閉じタグの前に不要な空白がないか調べます。",
    u"URLを絶対パスで入れてください。（ファイルをドラッグ&ドロップでおkです。）",
    u"※URLの末尾にスペースが入らないように注意してください。"
]
maxtxtlen = 0
for var in description:
    txtlen = len(var)
    if maxtxtlen < txtlen:
        maxtxtlen = txtlen
insertTxt = ""
for var in description:
    insertTxt += " " + var + "\n"
print frame*maxtxtlen + "\n" + insertTxt[0:-2] + "\n" + frame*maxtxtlen
#-- 説明文 ココマデ --

url = raw_input('URL:') #入力したURLを変数に入れる

# HTMLファイルを読み込み、行ごとに分割
allLines = open(url).read()
row = allLines.split("\n")

# 諸々の変数定義
textLine = ""
count = 1
commentFlg = 0
errorFlg = 0

for tagline in row:
    convertedTxt = "" #初期化
    flg = 1
    for parseTxt in tagline:
        if flg == 1:
            if parseTxt == " " or parseTxt == "\t":
                pass
            else:
                convertedTxt += parseTxt
                flg = 0
        else:
            convertedTxt += parseTxt

    # コメントアウト箇所を無視
    if convertedTxt[0:4] == "<!--":
        commentFlg = 1

    if commentFlg == 1:
        matchOB = re.search(patternB,convertedTxt)
        if matchOB:
            commentFlg = 0
    elif commentFlg == 0:
        # チェック
        matchOB = re.search(patternA,convertedTxt)
        if matchOB:
            print str(count) + " Line Error"
            errorFlg = 1
        else:
            pass
    count += 1

if errorFlg == 0:
    print "No Error"