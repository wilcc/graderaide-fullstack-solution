# Graderaide - Fullstack

Today you're going to take that design you made and connect it to the back end.


### What You Should Have At The End Of This Assignment

A beautiful and functional site that can use our back end to grab and change data and display it on the front end.

### How To Get There

Now, there are several parts of this task, and each may take a good chunk of time:

1. **Feed the information from the front end to the implementation on the back.** For example, the New Student form needs to call `Student` with its information, then put that student somewhere (maybe in an array?). Anywhere you're taking in data from the user, you'll likely want to use a back-end function.
* **Change the back end to fit the particular needs of your front end.** We've made some changes already to the version from the [Graderaide Backend Solution](https://github.com/abbreviatedman/graderaide-backend-solution) already, like removing the good-for-learning-but-unnecessary-for-a-simpler-implementation `hours` field from `Term`.  You will likely find you have other things you'd like to change; does it make more sense for your adding-student workflow to skip creating a course for them until later? If you find that your back end doesn't mesh with your vision for functionality, it makes a lot more sense to get that functionality in there than change your vision for the app to match the code that's currently there.
* **Display information to the user.** This is the hard part and the real meat of this assignment. We designed a user interface, but can we now code it dynamically? For example, we'll need to display all of our students, which means taking a student's name, course, term, and grades (or whichever info you'd like to display), embedding the data in some HTML elements, and then putting those elements on your page. We can't hard-code that or we'll have the same students every time, so we'll have to do that whenever we're displaying information to the user, which... is pretty much everything we're doing!


### Tools For Putting Your Data On The DOM.

* The main tool we've used in the past can continue to serve us well: good ol' `.createElement` and `.appendChild`. This can be a bit tough with nested elements, though, and the design you made may require quite a lot of that. For example, you might have this:

```html
<ul class="student-info">
  <li>Name: Mesuara</li>
  <li>Course: WDI</li>
  <li>Term: 1</li>
</ul>
```

To create that in JavaScript, you'd need somehting like this:

```javascript
const studentInfo = document.createElement('ul');
const nameItem = document.createElement('li');
const courseItem = document.createElement('li');
const termItem = = document.createElement('li');

nameItem.innerText = `Name: ${student.name}`;
courseItem.innerText = `Course: ${student.course}`;
termItem.innerText = `Term: ${student.term}`;

studentInfo.classList.add('student-info');
studentInfo.appendChild(nameItem);
studentInfo.appendChild(courseItem);
studentInfo.appendChild(termItem);
someParentElement.appendChild(studentInfo);
```

And that's a fairly simple container!

* Another method you could use is `innerHTML`. We've stayed away from it so far for several reasons, but one of the big reasons is that our apps' HTML wasn't _that_ complicated. But here's how you could produce those same elements that way:

```javascript
someParent.innerHTML = `<ul class="student-info">
  <li>Name: ${student.name}</li>
  <li>Course: ${student.course}</li>
  <li>Term: ${student.term}</li>
</ul>`
```
(OR use `.innerHTML +=` to append to what's already there.)

And that's it!

Now there ARE difficulties with this:

1. If you want to do anything immediately after you add this to the DOM, like append something else or add an event listener, it can be a bit tricky to query what you've just put there. My recommendation is to add an ID to something you want to hook into, which is easy; just add it to that innerHTML!
2. More importantly, there's a HUGE security issue with `innerHTML`. I'll let [Wes Bos explain Cross-Site Scripting attacks](https://wesbos.com/sanitize-html-es6-template-strings), but there ARE solutions to it, and... well… you'll be moving on to better and more secure ways to manipulate the DOM shortly. But just keep it in mind, and don't be that site that uses `innerHTML` and gives its users' data away!

**The bottom line is**, use whatever method you'd like!


### Another Major Pitfall

You're going to want to keep this to one html file until we learn better how to have several. (And once you get to React, you'll go back to one page... weird, right?) Otherwise, your page will be reloading the same JavaScript and your data will refresh every time you go from one section to another.


### Speaking Of Which

You'll be learning to persist your data next!!


### Good Luck!

And may the semi-colons be with you.
