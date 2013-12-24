dynamicForm
===========

Uses a template to create dynamic form elements (requires jQuery)


        <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
        <script type="text/javascript" src="dynamicFormUtilities.js"></script>

        <div class="hidden">
            <div id="multipleLocationsTemplate" style="text-align: center; padding:4px 0px 4px 0px;">
                <label for="startDateMultiLocations_0">From</label>
                <input type="text" id="startDateMultiLocations_0" title="Start date in new location" onkeyup="" />
                <label for="multiLocation_0">Location</label>
                <select id="multiLocation_0" title="Where do you live?" onchange="">
                    <option value="locationEngland" selected="selected">England</option>
                    <option value="locationScotland">Scotland</option>
                </select>
                <input type="button" value="&nbsp;-&nbsp;" id="deleteLocation_0" title="Delete this location"
                       onclick="$(document).dynamicTemplate('remove', '#multipleLocations2', this);" />
                <input type="button" value="&nbsp;+&nbsp;" id="addLocation_0" title="Add a location"
                       onclick="$(document).dynamicTemplate('add', '#multipleLocations2', this);" />
                <br />
            </div>
        </div>

        <hr>

        <div id="multipleLocations2" class="hidden input_form"></div>

        <script type="text/javascript">
            $(document).ready(function() {
                $(document).dynamicTemplate('set', '#multipleLocations2', '#multipleLocationsTemplate')
                        .dynamicTemplate('init');
            });
        </script>
