/**
 * ThemeInterface is in our redeclared module src/style-components.d.ts
 * The interface had to live inside there to make styled-components/macro work with the interface
 * We are keeping this file to make that connection more obvious. It's our custom theme interface.
 */
import { light } from './';
export type MOSTheme = typeof light;
// export type MOSTheme ={
//   body: {
//     color: string;
//     background: string;
//   };
//   header: {
//     background: string;
//     userButton: {
//       background: string;
//       color: string;
//     };
//     headerNavList: {
//       border: {
//         color: string;
//       };
//       background: string;
//       color: string;
//       svg: {
//         color: string;
//       };
//       menuItem: {
//         borderTop: string;
//       };
//       menuItemSelected: {
//         color: string;
//         background: string;
//       };
//       notifications: {
//         dismiss: string;
//       };
//     };
//     mainNavList: {
//       background: string;
//       borderTop: string;
//       color: string;
//       hoverColor: string;
//       icon: string;
//       popOver: {
//         background: string;
//         primaryNav: {
//           color: string;
//           link: {
//             color: string;
//             svg: {
//               color: string;
//             };
//           };
//         };
//         secondaryNav: {
//           background: string;
//           borderTop: string;
//           link: {
//             color: string;
//             svg: {
//               color: string;
//             };
//           };
//         };
//       };
//     };
//   };
//   alert: {
//     background: string;
//     header: {
//       badge: {
//         background: string;
//       };
//     };
//     rave: {
//       background: string;
//       color: string;
//       icon: {
//         color: string;
//       };
//     };
//     dx: {
//       info: {
//         background: string;
//         color: string;
//         icon: {
//           color: string;
//         };
//       };
//       warn: {
//         background: string;
//         color: string;
//         icon: {
//           color: string;
//         };
//       };
//     };
//   };
//   message: {
//     background: string;
//     closeIcon: {
//       color: string;
//     };
//     success: {
//       header: {
//         color: string;
//       };
//       border: {
//         color: string;
//       };
//     };
//     info: {
//       header: {
//         color: string;
//       };
//       border: {
//         color: string;
//       };
//     };
//     warn: {
//       header: {
//         color: string;
//       };
//       border: {
//         color: string;
//       };
//     };
//     error: {
//       header: {
//         color: string;
//       };
//       border: {
//         color: string;
//       };
//     };
//   };
//   notification: {
//     title: string;
//     date: string;
//     indicator: {
//       unread: string;
//       read: string;
//     };
//   };
//   mainGrid: {
//     background: string;
//     borderTop: string;
//   };
//   secondGrid: {
//     background: string;
//     borderTop: string;
//   };
//   footer: {
//     background: string;
//     color: string;
//     link: {
//       color: string;
//     };
//     iconLink: {
//       border: string;
//       color: string;
//       icon: {
//         color: string;
//       };
//     };
//     adminText: {
//       color: string;
//     };
//     masquerade: {
//       background: string;
//       color: string;
//     };
//   };
//   pageNotFound: {
//     link: {
//       background: string;
//       color: string;
//     };
//   };
//   features: {
//     academics: {
//       courses: {
//         header: {
//           color: string;
//         };
//         sectionHeader: {
//           color: string;
//         };
//         emptyList: {
//           text: {
//             color: string;
//           };
//           link: {
//             color: string;
//           };
//         };
//         dayList: {
//           borderBottom: string;
//           dayInFocus: {
//             borderBottom: string;
//           };
//           daySelected: {
//             borderBottom: string;
//           };
//           dayIndicator: {
//             color: string;
//           };
//           dayOfWeek: {
//             color: string;
//           };
//           dayOfWeekSelected: {
//             color: string;
//           };
//           dayOfMonth: {
//             color: string;
//             borderBottom: string;
//           };
//           dayOfMonthSelected: {
//             color: string;
//             borderBottom: string;
//           };
//         };
//         dialog: {
//           meetingTime: {
//             icon: {
//               color: string;
//             };
//           };
//           faculty: {
//             link: {
//               color: string;
//             };
//             icon: {
//               color: string;
//             };
//           };
//           map: {
//             link: {
//               color: string;
//             };
//             icon: {
//               color: string;
//             };
//           };
//         };
//         list: {
//           title: {
//             color: string;
//           };
//         };
//         plannerItems: {
//           list: {
//             icon: {
//               color: string;
//             };
//           };
//           emptyText: {
//             color: string;
//           };
//         };
//       };
//       pastCourses: {
//         title: {
//           color: string;
//         };
//         grade: {
//           color: string;
//         };
//       };
//       academicProgram: {
//         first: {
//           paddingBottom: string;
//         };
//         rest: {
//           borderTop: string;
//         };
//       };
//     };
//     canvas: {
//       authorizeButton: {
//         background: string;
//         color: string;
//       };
//     };
//     finances: {
//       accountBalance: {
//         emphasis: {
//           color: string;
//         };
//       };
//       mealPlans: {
//         emphasisBalance: {
//           color: string;
//         };
//         emphasisNoBalance: {
//           color: string;
//         };
//       };
//       transactions: {
//         amount: {
//           color: string;
//         };
//         amountCharge: {
//           color: string;
//         };
//         name: {
//           color: string;
//         };
//         detail: {
//           color: string;
//         };
//         emptyText: {
//           color: string;
//         };
//       };
//     };
//     itStatus: {
//       item: {
//         emptyText: {
//           color: string;
//         };
//         name: {
//           color: string;
//         };
//         status: {
//           color: string;
//         };
//         icon: {
//           unknown: string;
//           operational: string;
//           performanceIssues: string;
//           partialOutage: string;
//           majorOutage: string;
//         };
//       };
//       sticky: {
//         message: {
//           color: string;
//         };
//         title: {
//           color: string;
//         };
//         date: {
//           color: string;
//         };
//         icon: {
//           color: string;
//         };
//         badge: {
//           background: string;
//           color: string;
//         };
//       };
//     };
//     masquerade: {
//       buttonAlt: {
//         color: string;
//         background: string;
//       };
//     };
//     profile: {
//       name: {
//         color: string;
//       };
//       detail: {
//         color: string;
//       };
//       icon: {
//         color: string;
//       };
//       settings: {
//         emphasis: {
//           color: string;
//         };
//       };
//     };
//     resources: {
//       name: {
//         color: string;
//       };
//       icon: {
//         color: string;
//       };
//       dragIcon: {
//         color: string;
//       };
//     };
//     trainings: {
//       filter: {
//         border: string;
//         color: string;
//         background: string;
//         selected: {
//           color: string;
//           background: string;
//         };
//       };
//       menu: {
//         background: string;
//         color: string;
//         border: { color: string };
//         svg: {
//           color: string;
//         };
//         menuItem: {
//           borderTop: string;
//         };
//         menuItemSelected: {
//           color: string;
//           background: string;
//         };
//       };
//     };
//   };
//   ui: {
//     bubble: {
//       background: string;
//       color: string;
//       internalLink: {
//         background: string;
//         color: string;
//       };
//       externalLink: {
//         background: string;
//         color: string;
//       };
//     };
//     button: {
//       background: string;
//       color: string;
//       close: {
//         background: string;
//         color: string;
//       };
//       custom: {
//         background: string;
//         selectedBackground: string;
//         border: string;
//         color: string;
//         selectedColor: string;
//       };
//       info: {
//         background: string;
//         icon: {
//           color: string;
//         };
//       };
//     };
//     card: {
//       boxShadow: string;
//       background: string;
//       badge: {
//         background: string;
//         color: string;
//       };
//       contentRow: {
//         background: string;
//         borderBottom: string;
//       };
//       contentCell: {
//         borderLeft: string;
//       };
//       header: {
//         borderBottom: string;
//       };
//       icon: {
//         color: string;
//       };
//     };
//     date: {
//       color: string;
//     };
//     divider: {
//       border: string;
//     };
//     eventCard: {
//       color: string;
//       background: string;
//       title: {
//         color: string;
//       };
//       largeTitle: {
//         color: string;
//       };
//       date: {
//         background: string;
//         firstChild: {
//           color: string;
//         };
//         lastChild: {
//           color: string;
//         };
//       };
//       image: {
//         background: string;
//         color: string;
//         title: {
//           color: string;
//         };
//       };
//       button: {
//         color: string;
//         icon: {
//           color: string;
//         };
//       };
//     };
//     featuredCard: {
//       title: {
//         color: string;
//       };
//       content: {
//         color: string;
//       };
//     };
//     highlights: {
//       card: {
//         border: string;
//       };
//       description: {
//         color: string;
//       };
//       emphasis: {
//         color: string;
//       };
//       emphasisInline: {
//         color: string;
//       };
//       title: {
//         color: string;
//       };
//     };
//     icon: {
//       background: string;
//       color: string;
//       counter: {
//         background: string;
//         color: string;
//       };
//     };
//     input: {
//       border: string;
//       default: {
//         color: string;
//       };
//       large: {
//         color: string;
//       };
//       small: {
//         color: string;
//       };
//     };
//     label: {
//       color: string;
//     };
//     link: {
//       background: string;
//       color: string;
//       icon: {
//         external: {
//           color: string;
//         };
//         internal: {
//           color: string;
//         };
//       };
//     };
//     list: {
//       color: string;
//       item: {
//         background: string;
//         border: string;
//         header: {
//           color: string;
//         };
//         leadText: {
//           color: string;
//         };
//         description: {
//           color: string;
//         };
//         link: {
//           color: string;
//           hoverColor: string;
//           boxShadow: string;
//         };
//       };
//     };
//     myDialog: {
//       background: string;
//       border: string;
//       details: {
//         color: string;
//       };
//       h2: {
//         color: string;
//       };
//       h3: {
//         color: string;
//       };
//       header: {
//         border: string;
//       };
//     };
//     siteTitle: {
//       color: string;
//       badge: {
//         background: string;
//         color: string;
//       };
//     };
//     pageTitle: {
//       color: string;
//     };
//     plainCard: {
//       header: {
//         color: string;
//       };
//     };
//     richText: {
//       title: {
//         color: string;
//       };
//       link: {
//         color: string;
//       };
//     };
//     search: {
//       input: {
//         color: string;
//         background: string;
//         border: {
//           color: string;
//         };
//       };
//       icon: {
//         color: string;
//         selectedColor: string;
//       };
//       filter: {
//         apply: {
//           background: string;
//         };
//       };
//     };
//     searchResult: {
//       title: {
//         color: string;
//       };
//       subText: {
//         color: string;
//       };
//     };
//     skeleton: {
//       color: string;
//       highlight: string;
//     };
//     subNav: {
//       link: {
//         borderBottom: string;
//         color: string;
//         svg: {
//           color: string;
//         };
//         currentSvg: {
//           borderBottom: string;
//         };
//       };
//     };
//     table: {
//       border: string;
//       color: string;
//       cell: {
//         color: string;
//         borderBottom: string;
//         notFirstChild: {
//           borderLeft: string;
//         };
//       };
//       row: {
//         borderTop: string;
//         stripedEvenChildren: {
//           background: string;
//         };
//       };
//     };
//     text: {
//       lead: {
//         color: {
//           primary: string;
//           secondary: string;
//         };
//       };
//     };
//   };
// };

// export interface ThemeConfiguration extends ThemeInterface {}
