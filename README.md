# Homepage
This is my homepage to provide links to other services and tools.

It can be viewed [here](https://nathan-duckett.github.io/Homepage).

## Configuration
The `config.yaml` file provides a method to specify links and functionality on the homepage (to be expanded upon later).

To use the configuration the structure is as follows:
```sh
{
    // Root element
    "Rows": [
        //Logical row on the homepage screen
        [
            //Sections within this row
            {
                //Section title
                "Title": "",
                "Links": [
                    // Logical row within the section
                    [
                        // Link object containing a friendly name and link address
                        {
                            "Name": "",
                            "Link": ""
                        },
                        // Includes special link type with GAP to provide separation
                        {
                            "Type": "GAP"
                        }
                    ]
                ]
            }
        ]
    ]
}
```

This can be expanded for as much content as you require for all your links.

## Expansions
Looking to expand the functionality within the JSON parsing to allow widget creation to show statistics or other details from external sources.

## Notes
Feel free to fork this repo and create your own `config.yaml` file to host your own homepage. I accept no responsibilty for any issues you may have with the code in your own usage.