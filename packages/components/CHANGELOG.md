### [Versions]

Here you can see what's new added, changed or fixed in which version of our component library.
## 1.0.3
##### _Feb 5 2021_

**TLDR**: 
#### Feature

  - **FieldLayout** - add hideLabelOnFocus property. Setting this property to true will make placeholder (label) disappear when component is focused or not empty  [PR 958](https://github.com/crocoder-dev/monorepo/pull/958)
  - **Input**: add hideLabelOnFocus property which will be used on inner FieldLayout component. [PR 958](https://github.com/crocoder-dev/monorepo/pull/958)

#### Bugfix

  - **Navigation**: Elements below Navigation component won't shake anymore when height animation is occuring due scroll. Page which has Navigation component on top as well as scrollbar can now be scrolled to the bottom in one drag. [PR 942](https://github.com/crocoder-dev/monorepo/pull/942)

## 1.0.2

##### _Jan 7 2021_

**TLDR**: Fixed a bug in Select component.
#### Bugfix

  - **Exports**: When you call clearSelection and confirmChoice is false now really clears the state of Select component.
  
## 1.0.1
##### _Jan 5 2021_

**TLDR**: Exported missing Pagination and Typing components.
#### Bugfix

  - **Exports**: Exported missing Pagination and Typing components.
  
## 1.0.0
##### _Jan 5 2021_

**TLDR**: Added several components (Typing, Pagination) and fixed several bugs (mostly style related). Included breaking change of Select component.
#### Feature

  - **Typing**: added basic component that gets string as children and than displays it by typing letter by letter, with small pauses [PR 570](https://github.com/crocoder-dev/monorepo/pull/570)
  - **Pagination**: added basic component for pagination. Pagination component can display N sequential numbers, each representing page that can be selected. [PR 544](https://github.com/crocoder-dev/monorepo/pull/544)
  - **Expose Portal X Y**: Portal component has now exposed X and Y properties. [PR 556](https://github.com/crocoder-dev/monorepo/pull/556)
  - **Input properties**: Input component now exposes maxLength and defaultValue as props. [PR 606](https://github.com/crocoder-dev/monorepo/pull/606)

#### Bugfix

  - **Pill Button border style**: Pill button has now default border of 1px instead of 2px. Border will change to 2px when focused. [PR 555](https://github.com/crocoder-dev/monorepo/pull/555)
  - **Input style**: Input has now proper minimum lenght to match Field Layout component. [PR 606](https://github.com/crocoder-dev/monorepo/pull/606)
  - **Select**: dropdown won't close on option select if multiselection is enabled [PR 607](https://github.com/crocoder-dev/monorepo/pull/607)

#### Breaking changes

  - **Select**: fixed defaultSelection property to be array of ID's instead array of objects. [PR 607](https://github.com/crocoder-dev/monorepo/pull/607)


## 0.6.0
##### _Dec 18 2020_

**TLDR**: Added several components (FieldLayout, Portal, Select, Tabs) and fixed several bugs (mostly style related).
#### Feature

- **Aria Hidden Global Style**: applying `visibility=hidden` for all elements that have `aria-hidden` set to true.[PR 526](https://github.com/crocoder-dev/monorepo/pull/526)
- **Button**: added `pill` style variant [PR 429](https://github.com/crocoder-dev/monorepo/pull/429)
- **Listbox**: this version includes several changes:
  - the Space key will not select options (only Enter key will) [PR 446](https://github.com/crocoder-dev/monorepo/pull/446) 
  - pressing Tab will not move focus to the next Option but will move focus outside of Listbox component [PR 446](https://github.com/crocoder-dev/monorepo/pull/446)
  - added a new property called `forwardRef` which allows the client to use refs with the Listbox component. The Listbox component exposes two functions: `clear` and `getSelectedOptions`. [PR 446](https://github.com/crocoder-dev/monorepo/pull/446)
  - event handling in options was changed a bit to support the focus/state expectations of the parent components[PR 446](https://github.com/crocoder-dev/monorepo/pull/446) [PR 525](https://github.com/crocoder-dev/monorepo/pull/525)
  - the component now supports passing values that are defaultly selected [PR 446](https://github.com/crocoder-dev/monorepo/pull/446)
- **FieldLayout**: a basic component for creating various input fields. Useful to unify visual feedback for various states. Used in Input component and Select component [PR 526](https://github.com/crocoder-dev/monorepo/pull/526)
- **Input**: updated implementation to use FieldLayout component. [PR 526](https://github.com/crocoder-dev/monorepo/pull/526)
- **Navigation**: added new property called `defaultScrolled` that changes the initial value of the scrolled state. [PR 513](https://github.com/crocoder-dev/monorepo/pull/513)
- **Portal**: basic implementation. Use to create content in a portal (outside parent DOM). This component will look for the portal layer and will inject all elements there [PR 526](https://github.com/crocoder-dev/monorepo/pull/526)
- **Select**: basic implementation of a select component. Basically a collapsible listbox component with custom styling and functionality. Uses the newly-created FieldLayout component [PR 526](https://github.com/crocoder-dev/monorepo/pull/526)
- **Tabs**: added component basic implementation [PR 445](https://github.com/crocoder-dev/monorepo/pull/445)

#### Bugfix

- **Listbox**: 
  - when multiselection available, the option should always include an icon (be it an empty one or a checked one). The implementation before showed only checkIcon on selection regardless of multiselect option. This has been fixed in this version. [PR 526](https://github.com/crocoder-dev/monorepo/pull/526)
  - in case the listbox is too small to show all options, once an option becomes active it's scrolled into view [PR 446](https://github.com/crocoder-dev/monorepo/pull/446)
  - when no option is selected, aria attributes are displayed properly in HTML [PR 446](https://github.com/crocoder-dev/monorepo/pull/446)
- **Hooks**: before this version, the available hooks were not exported. Now the client has access to: `useDevice`, `useTypeAhead` and `useScrollPrevent` [PR 431](https://github.com/crocoder-dev/monorepo/pull/431)
- **Typography**: fixed issue with maximum font-size values. In addition, updated the fluid font size mixin so similar issues are avoided. [PR 526](https://github.com/crocoder-dev/monorepo/pull/526)

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
