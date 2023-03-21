# CSS Code Format and Structure

After the first sprint of the project, there are many missaligned structure and format to our css. I have extracted and restructured everything that is constantly duplicated through out the form (login and create an account) pages. Please follow the docs below to understand the new structure, and how to reuse/create common class in the future. 

## Common Style Class
To follow DRY (Do Not Repeat) principle, we have to make sure to extract common and reusable style to a class, so you or the next developer can use it in the future. If there is any specific style that you need to change, you can just make a specific class for that case, and override a part of the inherit as needed. 

For example: 

We have two boxes with the exact style and everything, the only that is different is the box color. So we can make a common class called `.content-box` and this class will have all of the SHARED style between all of the boxes. Then for the red box, we then have `.red-box` with `background-color: red` 

Your div will then look like. This way, your div will have all of the style from content-box, and the background color will be changed for this specific case. 

`<div class="content-box red-box"></div>` 

## Naming Convention
Please DO NOT use camelcase. It's hard to read and not a good practice. Name your class in lower case, and separate words by `-`. 

There are many well-known naming conventions, but for this small project, I think we should use Object Oriented CSS. Though we don't need to go wild with it, but this is a good practice to follow for better codes. 

Please read more about this via this link https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/

Other naming conventions if you want to learn more https://dev.to/xavortm/css-naming-conventions-nen

When it's a common class, be very generic but also give enough information. Like `.content-box` for all content box, or `.sidebar-content-box` for all content box in the sidebar. 

When it's a specific class, you need to be very specific to make it standout and easito understand, and also prevent conflicts with existing classes. 

## Be CONSITENT throughout the whole project
Someone else will have to read your code in the near future. It's a MUST to be consistent with the whole team. Make it easier for TOD (the next developer) to adapt and understand your codes. 

## New file structures 
I have extracted everything out to specific files. Instead of a long style.css file make it very difficult to read, now the file name will tell exactly its content. `quizpage.css` is for quiz page, `form.css` is everything for the forms, and `common.css` is everything to share across the site. As you building out new pages, please create file specific if none is created for that page yet. All css files are in the css folder of the `/public`.

Then inside `style.css` you can import that new created file in. `style.css` is the main place to import all necessary css files. 

# NOTE
What I'm saying here is just a small portion of knowledge for CSS. If you want to learn more, please also spend some time to learn about the language and structure. 
