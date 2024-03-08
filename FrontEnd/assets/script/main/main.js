/********************************************************************************
 ************** Initializes and launches the main final function *
 ********************************************************************************/

import { initializeGallery, logAdminOut } from "./script.js"
import { initializeModalGallery, deleteProject, initializeCategories, previewFile, updateSubmitButton, postFormData } from "./modal.js"

//////////////////////////////////////////////////////////////////////////////
// Launch the main gallery and generate filter buttons
initializeGallery()

// When logout, display none the elements of the admin
logAdminOut()

// Launch the modal gallery
initializeModalGallery()

// Delete projects on the galleries
deleteProject()

// Retrieves the categories from swagger and integrates them into the form
initializeCategories()

// Preview image in the form
previewFile()

// Update submit button color initially
updateSubmitButton()

// Add projects to the galleries
postFormData()