### [Versions]

Here you can see what's new added, changed or fixed in which version of our component library.

## 0.5.1.
##### _Dec 7 2020_

**TLDR**: Fixing Navigation style bug

#### Bugfix

- **Navigation**: had a issue with positioning of link children. [PR 333](https://github.com/crocoder-dev/monorepo/pull/333)


## 0.5.0

##### _Dec 7 2020_

**TLDR**: Added a new Loader component and fixing some logging and styling bugs.

#### Feature

- **Loader**: basic implementation of the loader components. [PR 266](https://github.com/crocoder-dev/monorepo/pull/266)
- **Navigation**: added `transparentOnZeroScroll` property which allows the navigation to be transparent until the user 
scrolls. Done as part of [PR 116](https://github.com/crocoder-dev/monorepo/pull/116)
- **Section**: added `removeVerticalPadding` which if set to true, eliminates all vertical padding applied on the Section component and in all screen sizes. [PR 117](https://github.com/crocoder-dev/monorepo/pull/117)
- **docs**: added basic media and section/card padding documentation.

#### Bugfix

- **Button disabled style**: had a border issue in Firefox. [PR 174](https://github.com/crocoder-dev/monorepo/pull/174)
- **Color propTypes**: were not properly set in some components and as such resulted in massive logging of errors in websites. This has been tackled in [PR 116](https://github.com/crocoder-dev/monorepo/pull/116) and [PR 266](https://github.com/crocoder-dev/monorepo/pull/266).

## 0.4.1

##### _Nov 26 2020_

**TLDR**: Fixing a style related bug and navigation closing issue.

#### Bugfix

- **Link style**: Fixed link class to include declaration for text decoration. [PR-99](https://github.com/crocoder-dev/monorepo/pull/99)
- **Navigation close**: There was an issue when navigation included buttons that do not switch pages. In such cases, on mobile screens the navigation would stay opened until closed by the user, which is considered redundant. This version fixes this issue by allowing the client to pass a function as children to Navigation. If a function is passed, it will receive a close function as parameter. [PR-101](https://github.com/crocoder-dev/monorepo/pull/101)


## 0.4.0

##### _Nov 24 2020_

**TLDR**: Added a new Listbox component and fixed some style issues.

#### Feature

- **Listbox**: basic implementation [PR 88](https://github.com/crocoder-dev/monorepo/pull/88/files)


#### Bugfix

- **Links (as buttons)**: with versions from before, one needed to either manually add style for the button everythime or (worse) wrap buttons and links around each other. As there is no Link component in this component library, we expose classes that apply styling defined in the design system. This bug added a style for button-like links. [PR 92](https://github.com/crocoder-dev/monorepo/pull/92)
- **Input (height change)**: because of a wrong calculation, our Input component changed it's height on some font-sizes causing other content to jump around. This version fixes that. [PR 90](https://github.com/crocoder-dev/monorepo/pull/90)
- **Footer (with Gatsby Image)**: the previous versions have a missing style declaration. As such, when an Gatsby image is passed as a logo, it's much larger than it should be which leads to overlapping footer links and logo image. [PR 90](https://github.com/crocoder-dev/monorepo/pull/90)


## 0.3.1

##### _Nov 17 2020_

**TLDR**: Adding Textarea component,Button style fixes and improving project by adding tests and enhancing documentation.

#### Feature

- **Test support**: the project was configured to include a basic tests configuration as well as support visual testing. Was done as part of [PR 77](https://github.com/crocoder-dev/monorepo/pull/77)
- **Documentation update**: added color documentation and enhanced docs of the Button and Card components.
- **Textarea component**: basic implementation, with fixes available from this version [PR 74](https://github.com/crocoder-dev/monorepo/pull/74/files)

#### Bugfix

- **Button**: updated style to reflect on the new design. As consequence, an outline implementation was removed. Original implementation did not include sufficient color contrast.[PR 77](https://github.com/crocoder-dev/monorepo/pull/77)

## 0.3.0

##### _Nov 4 2020_

**TLDR**: Added multiple basic components. Should be considered the initial version
of the component library.

#### Feature

- **Button**: added component basic implementation
- **Card**: added component basic implementation
- **Flexbox**: added component basic implementation
- **Footer**: added component basic implementation
- **Grid**: added component basic implementation
- **Icon**: added component basic implementation
- **Input**: added component basic implementation
- **Navigation**: added component basic implementation
- **Section**: added component basic implementation
- **Tag**: added component basic implementation
- **Typography**: added component basic implementation
