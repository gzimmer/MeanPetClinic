Pet Clinic in MEAN stack!
===================
Java has its own reference application to prove their concept to developers. MEAN doesn't have one but deserves it ! So why not creating the exact same one for MEAN ?
In add, it could bring a fair comparison in easiness and performance between these two technologies.
JEE proposes a Pet Store application, but Spring is certainly more popular and offers a pet clinic application. You can find it  there : https://github.com/spring-projects/spring-petclinic. And here it comes for MEAN. 
----------


Requirements
-------------

I develop the application with MEAN stack composed of :
* StrongLoop 6.0.1 (IBM API Connect) - https://strongloop.com/
* Node 6.0.0
* Mongo v 2.6.6 - https://www.mongodb.com/

    > **Note:**
    The application is still under development.

----------
Installation
-------------------

StrongLoop has been acquired by IBM and they change some names recently to accomodate the change of owner I guess. Nevertheless, I still use the good and old StrongLoop commande line. 
So install it with :   
`npm install -g strongloop@6.0.1`  
If you refer to the APIC documentation, be aware that slc is the original shell command and apic an alias made by IBM.

In Mongo you should load the file data.dat in petclinic database:  
`use petclinic`  
`load ("xx/data.dat)`

Now the data is in place.

At the root directory, install node dependencies:  
`npm install`

Then in the client directory, do the same with :  
`bower install`

After that, return to the root directory and launch :  
`slc run .`

Then browse to http://127.0.0.1:3000.