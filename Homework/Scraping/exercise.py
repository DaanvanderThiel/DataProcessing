# Name :
# Student number :
'''
This module contains an implementation of split_string.
'''

# You are not allowed to use the standard string.split() function, use of the
# regular expression module, however, is allowed.
# To test your implementation use the test-exercise.py script.

# A note about the proper programming style in Python:
#
# Python uses indentation to define blocks and thus is sensitive to the
# whitespace you use. It is convention to use 4 spaces to indent your
# code. Never, ever mix tabs and spaces - that is a source of bugs and
# failures in Python programs.


def split_string(source, separators):
    resultStrings = []
    # replace every seperator with a space
    for characters in separators:
        source = source.replace(characters,' ')
    source = source + " "
    i = 0
    string = ""
    for char in source:
        # add letter to string if it is no space
        if char != ' ':
            string += source[i]
        else:
            if string == '':
                string = ""
            else:
                # add string to resultstrings when the next space is found
                resultStrings.append(string)
                string = ""
        i = i + 1
    return resultStrings
'''
Split a string <source> on any of the characters in <separators>.
The ouput of this function should be a list of strings split at the
positions of each of the separator characters.
'''
    # PROVIDE YOUR IMPLEMENTATION HERE

if __name__ == '__main__':
    # You can try to run your implementation here, that will not affect the
    # automated tests.
    print split_string('abc', '')  # should print: ['c', 'd', 'r']
