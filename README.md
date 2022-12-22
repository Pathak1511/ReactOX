# Hosted URl : https://react-ox-liart.vercel.app/

# Express Api : https://long-plum-cobra-kit.cyclic.app

# To Run :

## If cloning the project make sure to add .env file in express_OX and add

- .env file
- DB=<your_url>
- NODE_ENV=development

## Use proper schema if want to develop more or else directly use Express Api for testing

# Problems faced :

- Axios Error while fetching at the client side
- passing of data from react routes to the other components

# Architecture design

- At Users data when he connect to the other users. Host users update its database with host email and string as [3,4,5,6,7,8,9,10,11,1] where last vale '1' indicat that it is hosted by the me
- Other person change this string with last value '0' to indicate that "I played my move"
- First 9 value are used for Game model
