Setup, Frameworks and tooling
-----------------------------

To complete the test, I chose to use typescript and JSS.
Typescript is great for a number of reasons - namely strictly typing your code and providing great tooling.
JSS is a powerful tool to help organise and manage your CSS code without providing another build tool.

I updated most of the package versions, and updated the webpack script with a few extra features for a "production" ready release, such as build splitting to separate node modules from app code, and options for minification for production build. I also added support for typescript.

I have used `jest` along with `enzyme` for my unit testing. Jest provides a nice API on top of a number of tools for running tests, as well as for creating spies and mocks. Enzyme is one of the best libraries for unit testing react components.

I also added linting using the ruleset that I use as standard. I find linting invaluable in making sure not only myself, but also all my team members objectively adhere to the same well defined code style.

Finally I added hot loading to help speed up development.

