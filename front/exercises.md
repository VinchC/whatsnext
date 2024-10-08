## Useful commands

- git checkout commit_id to access to former state
- git checkout branch_name to return to current branch

## Useful advices

- always consider the highest level of abstraction possible - DRY

## Front Training - Creation of pages and components

In branch configuration_front :
From commit cdadafa5545ca78c5cd605aa629a5c8470dff531 :

- a DisplayLinkToCategory component
- a categories/:id file
- the map of the categories in the index

From commit 38caf161e838d04d767569d89e3c0799b1338bd9 :

- a LpCard component and /lps route

                  ----------------------------------------------------------------------

In branch front_continued :
From commit bb222f057218c190bf80e7caa48ee6f4f3151322

- a Layout component with a Header component, and children passed in it (\_app > Layout > Header and { children })

                  ----------------------------------------------------------------------

In branch front_components :
From commit f8ef49b95f3ed92f3c0cb161f1be468de706958a

- a PrimaryButton component (highest level), a MailIcon and a SearchIcon

From commit 14d8de3aecd4a2547d06b1ca2050e1e6e55c7d98

- a publish Lp form with a bit of CSS

                  ----------------------------------------------------------------------

In branch more_front_components :
From commit 09e805fc4c9290d0e49e2092982d6ee25229b786

- a function that toggles currency (Euro <=> Dollar)

From commit f30e1c6561720533484b2ad0699d9af782d994e7

- a modal that will display content on home page

                  ----------------------------------------------------------------------

In branch back_link_front :
From commit 2dd657c4623eab15ed706a0e38fdcd41da59621f

- enablig CORS

- a useEffect that will fetch all the items on the index from the server

From commit a4f828ce97a9e712e20f2331fc4eef3fc0f7df97

- a useEffect that will fetch one item on item/:id page from the server

From commit 00fe7821b1f99f8a183feb3e95a10881b14e5b49

- a create LP method with the six steps (type, state, update, create, form, and onChange) and redirection

From commit 6a4c487e30a2d1d4424297f1eda462851aa57ec7

- a publish confirmation message (Alert Box, useRouter, useState for Modal, useEffect return true and Modal)

                  ----------------------------------------------------------------------

In branch loader_display_sort :
From commit a60db34c7d6e63edb4d6c4d529dabe413e092cb4

- CSS features implemented

From commit ad283adb17b980ab023322af68f6209c9c07aaf1

- fetch items for a specific category (entity method, index method and category/[id] page)
