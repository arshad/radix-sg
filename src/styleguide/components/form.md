---
title: Form
---

# Form

#### Example
<form action="">
  <div class="form-item form-type-textfield form-item-fname form-group">
    <label for="edit-fname">First name</label>
    <input class="form-control form-text required" type="text" id="edit-fname" name="fname" value="" size="60" maxlength="128" placeholder="First name">
  </div>
  <div class="form-item form-type-textfield form-item-lname form-group">
    <label for="edit-lname">Last name</label>
    <input class="form-control form-text required" type="text" id="edit-lname" name="lname" value="" size="60" maxlength="128" placeholder="Last name">
  </div>
  <div class="form-item form-type-textfield form-item-email form-group">
    <label for="edit-email">Email</label>
    <input class="form-control form-text required" type="text" id="edit-email" name="email" value="" size="60" maxlength="128" placeholder="Email address">
  </div>
  <div class="form-item form-type-select form-item-resources form-group">
    <label for="edit-resources">Resources</label>
    <select id="edit-resources" class="form-control">
      <option value="">Collections</option>
      <option value="">Resources</option>
      <option value="">Webinars</option>
    </select>
  </div>
  <div class="form-item form-type-textarea form-item-message form-group">
    <label for="edit-message">Message</label>
    <textarea class="form-control form-textarea" id="edit-message"></textarea>
  </div>
  <div class="form-actions form-wrapper" id="edit-actions">
    <input type="submit" id="edit-submit" name="op" value="Submit" class="form-submit btn">
  </div>
</form>