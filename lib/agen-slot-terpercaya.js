'use babel';

import AgenSlotTerpercayaView from './agen-slot-terpercaya-view';
import { CompositeDisposable } from 'atom';

export default {

  agenSlotTerpercayaView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.agenSlotTerpercayaView = new AgenSlotTerpercayaView(state.agenSlotTerpercayaViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.agenSlotTerpercayaView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'agen-slot-terpercaya:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.agenSlotTerpercayaView.destroy();
  },

  serialize() {
    return {
      agenSlotTerpercayaViewState: this.agenSlotTerpercayaView.serialize()
    };
  },

  toggle() {
    console.log('AgenSlotTerpercaya was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
