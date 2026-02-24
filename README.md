


1. What is the difference between getElementById, getElementsByClassName, and querySelector/querySelectorAll?
ans:-getElementById selects a single element using a specific id. getElementsByClassName selects multiple elements that share the same class name.querySelector selects the first matching element.querySelectorAll selects all matching elements.

2. How do you add a new element to the DOM?
ans:-First, create the element using createElement().Then, set its content.Finally, insert it into the DOM using appendChild().

3. What is Event Bubbling?
Ans:-When an event occurs on a child element, it propagates step by step up to its parent elements — this process is called Event Bubbling.

4. What is Event Delegation? Why is it useful?
ans:-Event Delegation means attaching a single event listener to a parent element to handle events for its child elements.
It works for dynamically created elements and improves performance.

5. What is the difference between preventDefault() and stopPropagation()?
ans:-preventDefault() stops the browser’s default behavior.stopPropagation() prevents the event from propagating to parent elements.
