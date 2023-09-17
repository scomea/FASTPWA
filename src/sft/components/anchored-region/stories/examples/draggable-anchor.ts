import { Updates } from "@microsoft/fast-element";
import {
    css,
    ElementViewTemplate,
    FASTElement,
    html,
    observable,
    when,
} from "@microsoft/fast-element";

export function registerDraggableAnchor() {
    DraggableAnchor.define({
        name: "draggable-anchor",
        template: draggableAnchorTemplate(),
        styles: draggableAnchorStyles,
    });
}

/**
 *
 *
 * @public
 */
export class DraggableAnchor extends FASTElement {
    @observable
    public isDragging: boolean = false;

    private updateQueued: boolean = false;
    private lastMouseEvent: MouseEvent | null = null;

    public connectedCallback(): void {
        super.connectedCallback();
    }

    public disconnectedCallback(): void {
        super.disconnectedCallback();
        this.lastMouseEvent = null;
    }

    /**
     *
     */
    public handleMouseDown = (e: MouseEvent): void => {
        this.isDragging = true;
        window.addEventListener("mousemove", this.handleMouseMove, { passive: true });
        document.addEventListener("mouseup", this.handleMouseUp);
        this.lastMouseEvent = e;
        this.updatePosition();
    };

    /**
     *
     */
    public handleMouseUp = (e: MouseEvent): void => {
        this.isDragging = false;
        window.removeEventListener("mousemove", this.handleMouseMove);
        document.removeEventListener("mouseup", this.handleMouseUp);
        this.lastMouseEvent = e;
        this.updatePosition();
    };

    /**
     * handles mouse move events when in mouse tracking mode
     */
    public handleMouseMove = (e: MouseEvent): void => {
        this.lastMouseEvent = e;
        if (this.updateQueued) {
            return;
        }
        this.updateQueued = true;
        Updates.enqueue(() => this.updatePosition());
    };

    private updatePosition() {
        this.updateQueued = false;
        if (!this.lastMouseEvent) {
            return;
        }
        this.style.transform = `translate(${
            this.lastMouseEvent.pageX -
            document.documentElement.scrollLeft -
            this.offsetLeft
        }px, ${
            this.lastMouseEvent.pageY -
            document.documentElement.scrollTop -
            this.offsetTop
        }px)`;
        this.lastMouseEvent = null;
        this.$emit("positionchange", this, { bubbles: false });
    }
}

/**
 * The template
 * @public
 */
export function draggableAnchorTemplate<T extends DraggableAnchor>(): ElementViewTemplate<
    T
> {
    return html<T>`
        <template>
            <adaptive-button
                @mousedown="${(x, c) => x.handleMouseDown(c.event as MouseEvent)}"
                @mouseup="${(x, c) => x.handleMouseUp(c.event as MouseEvent)}"
            >
                <slot></slot>
            </adaptive-button>
        </template>
    `;
}

export const draggableAnchorStyles = css`
    :host {
        display: block;
        position: absolute;
    }
`;
