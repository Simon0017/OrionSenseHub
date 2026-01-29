from django.db import models
from projects.models import project
from django.utils.text import slugify

class devices(models.Model):
    '''Records all the devices in a project,can also be referred to as units'''
    title = models.CharField(max_length=300,default="default")
    slug = models.SlugField(max_length=300,unique=True)
    device_id = models.CharField(max_length=300,editable=False)
    description = models.TextField()
    sensors = models.JSONField(default=list,null=True) #define sensors in the template to match the sensors definitions

    # relations
    project = models.ForeignKey(project,on_delete=models.CASCADE,related_name="devices")

    # timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # meta class
    class Meta:
        ordering = ["-created_at"]
        unique_together = ("project","device_id") # a device cannot belong to more than one project

    
    # class methods
    def save(self, *args,**kwargs):
        if not self.device_id and self.project:
            # get the project,get the last device id related to the project and then assign the device id
            last_device = self.project.devices.order_by("-id").first()
            if last_device and last_device.device_id:
                last_id = int(last_device.device_id.split("-")[-1])
                new_id = last_id + 1
            else:
                new_id = 1

            modified_title = self.title.title()
            prefix = ''.join([word[0].upper() for word in modified_title.split()])
            self.device_id = f"{prefix}-{new_id:04d}"

        # gen automatically a slug
        if self.pk:
            old_title = type(self).objects.get(pk = self.pk).title
            if old_title != self.title:
                self.slug = slugify(self.title)
        else:
            self.slug = slugify(self.title)

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Device: {self.title} Created on {self.created_at}"

class devices_configuration(models.Model):
    '''Device settings for command dispatch in cron jobs or other comm models'''
    DATA_TYPE_CHOICES = [
        ("temperature","Temperature"),
        ("humidity","Humidity"),
        ("gps","GPS"),
        ("degrees","Degrees"),
        ("image_url","Image_url"),
        ("distance","Distance"),
        ("ph","Ph")
    ]
    device = models.ForeignKey(devices,on_delete=models.CASCADE,related_name='configurations') # can attach multiple configuration/rules to the same device
    data_type = models.CharField(max_length=200,null=True,choices=DATA_TYPE_CHOICES)
    min_value = models.DecimalField(decimal_places=2,max_digits=5,null=True)
    max_value  = models.DecimalField(decimal_places=2,max_digits=5,null=True)

    rule = models.CharField(max_length=250,null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # class methods
    def __str__(self):
        return f"Device configuration for device: {self.device.title} created on {self.created_at}"