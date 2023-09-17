// import { html } from "@microsoft/fast-element";
// import { uniqueId } from "@microsoft/fast-web-utilities";
// import { Meta, renderComponent, Story, StoryArgs } from "../../../utilities/storybook-helpers.js";
// import type { SFTAnchoredElement } from "../anchored-region.js";
// import {
//     AutoUpdateMode,
//     AxisPositioningMode,
//     AxisScalingMode,
//     HorizontalPosition,
//     VerticalPosition,
// } from "../anchored-region.options.js";
// import type { DraggableAnchor } from "./examples/draggable-anchor.js";
// import { ArPositions } from "./examples/ar-position-demo.js";

// const storyTemplate = html<StoryArgs<SFTAnchoredElement>>`
//         <adaptive-anchored-region
//             class="region"
//             ?use-virtual-anchor="${x => x.useVirtualAnchor}"
//             :virtualAnchorX="${x => x.virtualAnchorX}"
//             :virtualAnchorY="${x => x.virtualAnchorY}"
//             ?horizontal-inset="${x => x.horizontalInset}"
//             ?horizontal-viewport-lock="${x => x.horizontalViewportLock}"
//             ?vertical-inset="${x => x.verticalInset}"
//             ?vertical-viewport-lock="${x => x.verticalViewportLock}"
//             anchor="${x => x.anchor}"
//             auto-update-mode="${x => x.autoUpdateMode}"
//             fixed-placement="${x => x.fixedPlacement}"
//             horizontal-default-position="${x => x.horizontalDefaultPosition}"
//             horizontal-positioning-mode="${x => x.horizontalPositioningMode}"
//             horizontal-scaling="${x => x.horizontalScaling}"
//             horizontal-threshold="${x => x.horizontalThreshold}"
//             vertical-default-position="${x => x.verticalDefaultPosition}"
//             vertical-positioning-mode="${x => x.verticalPositioningMode}"
//             vertical-scaling="${x => x.verticalScaling}"
//             vertical-threshold="${x => x.verticalThreshold}"
//             viewport="${x => x.viewport}"
//         >
//             ${x => x.storyContent}
//         </adaptive-anchored-region>
//     </div>
// `;

// export default {
//     title: "Anchored Element",
//     args: {
//         storyContent: html`
//             <div
//                 id="content"
//                 style="background:rgba(0, 255, 0, 0.2); height:100%; width:100%;"
//             >
//                 <div style="background: var(--neutral-fill-rest); padding: 10px">
//                     anchored element
//                 </div>
//             </div>
//         `,
//         autoUpdateMode: "auto",
//         fixedPlacement: true,
//         horizontalViewportLock: false,
//         verticalViewportLock: false,
//         horizontalPositioningMode: "dynamic",
//         verticalPositioningMode: "dynamic",
//     },
//     argTypes: {
//         anchor: { control: "text" },
//         anchorId: { table: { disable: true } },
//         autoUpdateMode: {
//             control: "select",
//             options: Object.values(AutoUpdateMode),
//         },
//         useVirtualAnchor: { control: "boolean" },
//         virtualAnchorX: { control: "number" },
//         virtualAnchorY: { control: "number" },
//         pointerTracking: { control: "boolean" },
//         fixedPlacement: { control: "boolean" },
//         horizontalDefaultPosition: {
//             control: "select",
//             options: Object.values(HorizontalPosition),
//         },
//         horizontalInset: { control: "boolean" },
//         horizontalPositioningMode: {
//             control: "select",
//             options: Object.values(AxisPositioningMode),
//         },
//         horizontalScaling: {
//             control: "select",
//             options: Object.values(AxisScalingMode),
//         },
//         horizontalThreshold: { control: "number" },
//         horizontalViewportLock: { control: "boolean" },
//         storyContent: { table: { disable: true } },
//         verticalDefaultPosition: {
//             control: "select",
//             options: Object.values(VerticalPosition),
//         },
//         verticalInset: { control: "boolean" },
//         verticalPositioningMode: {
//             control: "select",
//             options: Object.values(AxisPositioningMode),
//         },
//         verticalScaling: {
//             control: "select",
//             options: Object.values(AxisScalingMode),
//         },
//         verticalThreshold: { control: "number" },
//         verticalViewportLock: { control: "boolean" },
//         viewport: { control: "text" },
//     },
//     decorators: [
//         (Story: any, args: any ) => {
//             // IDs are generated to ensure that they're unique for the docs page
//             const renderedStory = Story() as DocumentFragment;
//             const anchor = (renderedStory.querySelector(
//                 ".anchor"
//             ) as any) as DraggableAnchor;
//             const region = (renderedStory.querySelector(
//                 ".region"
//             ) as any) as SFTAnchoredElement;

//             const anchorId = args.anchorId ?? uniqueId("anchor");

//             if (anchor) {
//                 anchor.id = anchorId;
//                 anchor.addEventListener("positionchange", () => {
//                     region?.update();
//                 });

//                 if (region) {
//                     region.id = uniqueId("region");
//                     region?.setAttribute("anchor", anchorId);
//                 }
//             }

//             return renderedStory;
//         },
//     ],
// } as Meta<SFTAnchoredElement>;

// export const AnchoredRegion: Story<SFTAnchoredElement> = renderComponent(
//     html<StoryArgs<SFTAnchoredElement>>`
//         <div style="min-height: 100px">
//             ${storyTemplate}
//             <draggable-anchor
//                 class="anchor"
//                 virtual-anchor-x="150"
//                 virtual-anchor-Y="150"
//             >
//                 Anchor
//                 <br />
//                 Click to Drag
//             </draggable-anchor>
//         </div>
//     `
// ).bind({});

// export const PointAnchor: Story<SFTAnchoredElement> = renderComponent(
//     html<StoryArgs<SFTAnchoredElement>>`
//         <div style="min-height: 100px">
//             ${storyTemplate}
//         </div>
//     `
// ).bind({});
// PointAnchor.args = {
//     useVirtualAnchor: true,
//     virtualAnchorX: 200,
//     virtualAnchorY: 200,
//     storyContent: html`
//         <div
//             id="content"
//             style="background:rgba(0, 255, 0, 0.2); height:100%; width:100%;"
//         >
//             <div style="background: var(--neutral-fill-rest); padding: 10px">
//                 Position controlled by
//                 <br />
//                 virtual-anchor-x and virtual-anchor-y
//             </div>
//         </div>
//     `,
// };

// export const PositionsDemo: Story<SFTAnchoredElement> = renderComponent(
//     html<StoryArgs<SFTAnchoredElement>>`
//         <ar-position-demo :positions="${x => x.Positions}"></ar-position-demo>
//     `
// ).bind({});
// PositionsDemo.parameters = { controls: { include: ["Positions"] } };
// PositionsDemo.argTypes = {
//     Positions: {
//         control: "select",
//         options: Object.values(ArPositions),
//     },
// };
// PositionsDemo.args = {
//     Positions: "fillLocked",
// };

// export const LockIntoView: Story<SFTAnchoredElement> = renderComponent(
//     html<StoryArgs<SFTAnchoredElement>>`
//         <ar-lock-into-view></ar-lock-into-view>
//     `
// ).bind({});
// LockIntoView.parameters = { controls: { include: [], hideNoControlsWarning: true } };
// LockIntoView.argTypes = {};
// LockIntoView.args = {};
