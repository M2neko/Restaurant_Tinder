A cool website helps you choose a good restaurant when you can't decide.

٩(◕‿◕｡)۶
# How to use our website:
1. One person click on "Go", get a new link which can share with others by copy or email(players who entering game through this link will go to chat page directly).

2. Click on "Start Game", enter location and keyword for restaurants in new page.

3. Click on "Get Restaurant", go to chat page and waiting for other players to join in. 
The first person who entering this page will be the host, not always the one who start the game and enter infomation.
Only host can start game.

4. Host starts game, everyone will be in the tinder page and make choice. 
After all players make their choices they will see the result page. 
If they did not get a result through one round, the tinder game will automatically continue the next round(explanation in # Principal).



# Design

1. Fonts:

Playfair Display: *https://fonts.google.com/specimen/Playfair+Display?query=playfair*

Carter One: *https://fonts.google.com/specimen/Carter+One?query=carter+one*

Vidaloka: *https://fonts.google.com/specimen/Vidaloka?query=vida*

2. Main Colors:

Main background color: *#FFCF99*

Footer background color: *#FFC07F*

Text colors: *#F15156*; *#F15156*; *#FC7753*;

3. Icons from Fontawesome and Noun Project

*https://fontawesome.com*

*https://thenounproject.com*

4. Logo and UI images designed by team *Yearbook Haters*


# Implementation

1. Yelp Restaurant Search Engine

2. Autocompletion of category

3. Copy link and send link via e-mail

4. Live Chat Box (Random Name User)

5. Live Swiper Tinder card and buttons

6. Selection algorithm for favorite restaurant

# Principal

There are four conditions to determine the end of Tinder selection.

1. At least one restaurant is all loved.

2. All restaurants are all disliked.

3. Only one restaurant left.

4. Besides the first round, the current round's top love number is lower than 1.414 times of the former round's.

>-- If seeing how many of the other players liked a restaurant does not lead to picking one, the game defaults to choosing a random restaurant from those which were chosen the most. 

This is calculated by `(A/2) * (1 + x%) ^ 2 = A`, where `A` is the number of players (clients), and `x% = sqrt(2) - 1`.

# Specific

1. Host only for a single game.

2. Offer for at most eight players, and default restaurant number is eight.

3. Categories are only available in "US" or "All" `(This is required)`.

# Reference List

1. Swiper: *https://codepen.io/RobVermeer/pen/japZpY*

2. RandomString: *https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript*

3. AnimalList: *https://gist.githubusercontent.com/borlaym/585e2e09dd6abd9b0d0a/raw/6e46db8f5c27cb18fd1dfa50c7c921a0fbacbad0/animals.json*

4. CategoryList: *https://www.yelp.com/developers/documentation/v3/all_category_list*

5. Autocomplete: *https://leaverou.github.io/awesomplete*

6. YelpAPI: *https://github.com/Yelp/yelp-fusion#code-samples*

7. ResultRatingBoard: *https://www.w3schools.com/howto/howto_css_user_rating.asp*