# PaperDriver

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Repository for the iPad based Truck Tracking system for managing paper-work.
The primary functionality of this project is to manage the workflow for
truck-based delivery companies. The task that we were presented with was
how to reduce the number of paper-work the drivers had to manage. We did
this by taking the required paperwork and digitalizing it into a tablet.

We then create a work flow that insures that all of the required data
for each of the required documents is generated or contained inside the
tablet. That way we can generate all of the PDF's inside the tablet,
and then export the final documents to be stored on a file server of which
the delivery company can access.

The name "PaperDriver" is to show the focus that the intention of the 
application is to reduce the work load of the drivers from focusing
on paperwork to focusing on deliveries. The name itself is a play on
the term "paper driver", meaning that someone has a license but no
real driving experience. This is meant to be an ironic joke, as the
intention of the application is to do the opposite, remove the paper
and focus on the driving. 

## Application Structure

This application contains two main folders, **public**, and **docs**.
The **public*+ folder is where the source files for the application 
are contained. These are used for development, and they are the
unminified, editable versions of the source code. The second folder
is **docs** and this contains the 'built' or compiled version of the
application. The application can be built by running the file **build.js**,
which will take the source files, compress, uglify them and then also
add in a service worker for caching the application.

The structure of this application is such that it is intended to be deployed
on a tablet and run offline. This means that several design decisions were
made to accomidate this. There is no login, and no server calls. The application
itself is a set of static pages that are cached, and the application is run
on a tablet. Data, such as who the driver is, or what truck they are driving
is defined by the data that is loaded onto the tablet. This is intentionally
done to make it as easy as possible to use by not requiring management of
usernames and passwords.

As the application itself is a static page, access to the application is to
be restricted on the network level, such as a VPN. And stategies for how
to set up a role-out of this application are included in the Wiki of
this Repository. PDF's, CSV and other files are exported as files
to the location where the server is hosted. Approaches for storage solutions
and options are also included in the wiki. 

## License

MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Copyright

Copyright © Web Service Development Inc. 2021

