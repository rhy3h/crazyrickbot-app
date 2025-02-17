// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge } from 'electron'

import { storeIPC } from '@/electron/ipc/mainProcess/storeIPC'
// Renderer Process to Main Process
contextBridge.exposeInMainWorld('store', storeIPC)

// Main Process to Renderer Process
