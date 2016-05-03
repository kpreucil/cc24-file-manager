var fs = require('fs');

var useStdin = function () {
    var input = process.stdin.read();
    if (input !== null) {
        var inputSplit = input.toString().trim().split(" ");
        if (inputSplit[0] == "cat") {
            //cat <filename>
            catFile(inputSplit[1]);
        } else if (inputSplit[0] == "touch") {
            //touch <filename>
            createNewFile(inputSplit[1]);
        } else if (inputSplit[0] == "rm") {
            removeFile(inputSplit[1]);
        } else if (inputSplit[0] == "replace") {
            findReplaceWord(inputSplit[1], inputSplit[2], inputSplit[3]);
        } else if (inputSplit[0] == "grep"){
            findLine(inputSplit[1], inputSplit[2]);
        }
    }
};

//create a file (touch)
function createNewFile(fileName) {
    fs.writeFile(fileName, "", function (err) {
        if (err) {
            console.log("Could not write to file");
        } else {
            console.log("File created and saved");
        }
    });
}

//read from a file (cat)
function catFile(fileName) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            console.log("Unable to read from file");
        } else {
            console.log(data.toString());
        }
    });
}

//remove a file
function removeFile(fileName) {
    fs.unlink(fileName, function (err) {
        if (err) {
            console.log("Unable to find file");
            console.log(err);
        } else {
            console.log("File Removed");
        }
    });
}

//find and replace a word
function findReplaceWord(fileName, wordToReplace, replacementWord) {
    fs.readFile(fileName, "", function (err, data) {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            //            console.log(data, "I'm Here");
            //                console.log(data.toString().split("hello"));

            var result = data.toString().split(wordToReplace).join(replacementWord);
            fs.writeFile(fileName, result, function (err) {
                if (err) {
                    console.log("It didn't work");
                    console.log(err);
                }
                console.log("saved");
            });
        }
    });
}

//find a line in a file
function findLine(fileName, findWord){
    fs.readFile(fileName, "", function(err, data){
       if (err) {
           console.log("Error");
           console.log(err);
       } 
        var result = data.toString().split("\n");
//        result = result.filter(findWord);
//        console.log(result);
//        console.log(result.filter(findWord));
        for (var i = 0; i < result.length; i++){
            if (result[i].indexOf(findWord)!== -1){
                console.log(result[i]);
            }
        }
        
    });
}




process.stdin.on('readable', useStdin);

////hint: "\n" == new line
////opt 1
//for each line: if the line contains the string (hint: indexOf)
//console.log(that line)
////opt 2
//lines.filter(function (item)==>
//return item.indexOf (...) !== -1
//)
//console.log lines
//   

/*
Your assignment is to implement the following functionality:
	* remove a file
		"rm" <file name>
		> rm hello.txt
			entirely delete the file hello.txt

	* find and replace a word in the file
		"replace" <file to search> <word to replace> <replacement word>
		> replace hello.txt hello goodbye
			replace all instances of hello in hello.txt with goodbye
		> replace what.txt there their
			replace all instances of there in what.txt with their

	* find a line in a file
		"grep" <file name> <word to find>
		> grep hello.txt hello
			print out all of the lines in hello.txt that contain "hello"
		> grep what.txt there
			print out all of the lines in what.txt that contain "there"

	Bonus work:
		* Ask for confirmation before deleting a file
		* Don't let people delete files that are above the current working directory (i.e. disallow "../")
		* Have grep take a regular expression as the word to find
		* Create mkdir and rmdir
*/