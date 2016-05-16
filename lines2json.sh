#/bin/sh
counter=1
fileName="customerlist.js"
[ -f "${fileName}" ] && rm -f "${fileName}"

echo "var customerlist = [" >> ${fileName}

cat customerlist.txt | while read line ;
do

    if [ ${counter} == 1 ]; then
    	echo "path 1, ${counter}"
        echo "${line}" >> ${fileName}
    else
    	echo "path 2, ${counter}"
        echo ",${line}" >> ${fileName}
    fi

    (( counter ++ ))
done

echo "];" >> ${fileName}
