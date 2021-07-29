module.exports = {
    EVENT_TAB: "//div[@class='sub-headers']//div[@class='item-content']//div[text()='Events']",
    RACING_EVENT_SELECTED: ".race-description .race-title .race-name",
    RACING_ENTRY_FREE: ".free-race-badge",
    RACING_EVENT_INFO: ".buy-in-content  .race-info .in-race-info .race-status .race-prize-pool-container .race-prize-pool .horses-registered span",
    RACING_ENTRY_HAS_FEE: ".label-content .right .buy-in .primary-text",
    RACING_EVENT_LIST: ".page-content.buy-in .accordion-container .accordion-content .accordion .panel",
    SELECTED_RACING_EVENT: ".page-content.buy-in .accordion-container .accordion-content .accordion .panel:nth-child(${i})",
    SELECTED_RACING_EVENT_NAME : ".page-content.buy-in .accordion-container .accordion-content .accordion .panel:nth-child(${i}) .panel__label .label-content .event > .primary-text",
    SELECTED_GATE_REGISTERED_INFO: ".page-content.buy-in .accordion-container .accordion-content .accordion .panel:nth-child(${i}) .buy-in-content .in-race-info .horses-registered span",
    SELECTED_RACING_EVENT_GATE_HEADER: ".page-content.buy-in .accordion-container .accordion-content .accordion .panel:nth-child(${i}) .buy-in-content .pick-gate .h3-text",
    SELECTED_RACING_EVENT_OPEN_GATES_LIST: ".page-content.buy-in .accordion-container .accordion-content .accordion .panel:nth-child(${i}) .buy-in-content .pick-gate .gate-group .gate-btn",
    CUSTOM_CLASS_BUTTON: "//div[@class='open-races']//div[@class='race-filters']/div[descendant::text()='${name}']//label",
     
};    