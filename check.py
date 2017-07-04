# -*- coding: utf-8 -*- 

import re

patternA = r">*?\s<|>*?　<"

url = raw_input('URL:')

allLines = open(url).read()
row = allLines.split("\n")
textLine = ""
count = 1
errorFlg = 0
for tagline in row:
    convertedTxt = "" #初期化
    flg = 1
    for parseTxt in tagline:
        if flg == 1:
            if parseTxt == " ":
                pass
            else:
                convertedTxt += parseTxt
                flg = 0
        else:
            convertedTxt += parseTxt
    matchOB = re.search(patternA,convertedTxt)
    if matchOB:
        print str(count) + " Line " +"error"
        errorFlg = 1
    else:
        pass
    count += 1

if errorFlg == 0:
    print "No Error"